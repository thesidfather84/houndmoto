/**
 * POST /api/ai
 *
 * Unified diagnostic API endpoint. Routes to the configured AI provider
 * via aiProvider.js and falls back to diagnosticsRules.js automatically.
 *
 * Request body:
 *   { type: "symptom"|"dtc"|"vehicle", context: { vehicle?, symptoms?, dtcCode?, question? } }
 *
 * Response:
 *   { text, source, fallback, urgency, safetyNote, system, dtcLink?, recallLink? }
 */

import { isAIConfigured, callAI, getProviderInfo } from "./aiProvider.js";
import { rulesBasedDiagnosis } from "./diagnosticsRules.js";

// ── System prompt (provider-agnostic) ────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert automotive diagnostic assistant helping vehicle owners and mechanics diagnose problems accurately and safely.

Your role:
- Provide ranked likely causes (most to least probable) based on described symptoms
- Suggest specific diagnostic checks BEFORE recommending part replacement
- Prioritize safety-critical issues clearly and urgently
- Keep responses concise and formatted for mobile screens (short paragraphs, bullet points)
- Do not fabricate part numbers, torque specs, or specific vehicle data — say "verify in your service manual"
- Always recommend professional inspection for: brakes, steering, airbags, fuel systems
- Do not diagnose definitively from limited information — note what additional checks are needed

Response format:
- Start with the most likely system affected
- List probable causes as bullet points
- List first diagnostic checks as bullet points
- End with any safety warnings if applicable
- Keep total length under 400 words for mobile readability`;

// ── User prompt builders ──────────────────────────────────────────────────────

function buildUserPrompt(type, context = {}) {
  const { vehicle, symptoms, dtcCode, question } = context;
  const v = vehicle
    ? `${vehicle.year || ""} ${vehicle.make || ""} ${vehicle.model || ""} ${vehicle.engine || ""}`.trim()
    : null;

  if (type === "symptom") {
    return [
      v ? `Vehicle: ${v}` : null,
      `Symptoms: ${symptoms || "(not specified)"}`,
      "Please provide: likely system affected, probable causes ranked by likelihood, and specific first diagnostic checks.",
    ].filter(Boolean).join("\n");
  }

  if (type === "dtc") {
    return [
      v ? `Vehicle: ${v}` : null,
      `DTC code: ${(dtcCode || "").toUpperCase()}`,
      "Please explain: what system this code affects, the most likely root causes for this vehicle, and what to check first.",
    ].filter(Boolean).join("\n");
  }

  // type === "vehicle" or fallthrough
  return [
    v ? `Vehicle: ${v}` : null,
    `Question: ${question || symptoms || "(no question provided)"}`,
    "Provide practical diagnostic guidance for this question.",
  ].filter(Boolean).join("\n");
}

// ── Supplemental links ────────────────────────────────────────────────────────

function buildLinks(type, context) {
  const links = {};
  const { dtcCode, vehicle } = context || {};

  if (type === "dtc" && dtcCode) {
    links.dtcLink = `/dtc/${dtcCode.toLowerCase()}`;
  } else {
    links.dtcLink = "/dtc";
  }

  links.recallLink = "/vin-recall-check";
  return links;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Parse body
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const { type, context } = body || {};

  // Validate type
  const validTypes = ["symptom", "dtc", "vehicle"];
  if (!type || !validTypes.includes(type)) {
    return res.status(400).json({ error: `"type" must be one of: ${validTypes.join(", ")}` });
  }

  // Supplemental links always included regardless of AI status
  const links = buildLinks(type, context);

  // ── No AI configured → rules-based only ─────────────────────────────────
  if (!isAIConfigured()) {
    const rules = rulesBasedDiagnosis(type, context);
    return res.status(200).json({
      ...rules,
      ...links,
      fallback: true,
      fallbackReason: "no_ai_configured",
    });
  }

  // ── Try AI provider ──────────────────────────────────────────────────────
  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user",   content: buildUserPrompt(type, context) },
    ];

    const text = await callAI(messages, { maxTokens: 700, temperature: 0.3 });
    const info = getProviderInfo();

    // Rules-based data is still computed for structured fields (urgency, safetyNote, etc.)
    const rules = rulesBasedDiagnosis(type, context);

    return res.status(200).json({
      text,
      source: info?.id || "ai",
      model: info?.model,
      fallback: false,
      // Structured fields from rules engine supplement the AI text
      urgency: rules.urgency,
      safetyNote: rules.safetyNote,
      system: rules.system,
      ...links,
    });
  } catch (err) {
    // AI failed → transparent fallback to rules
    console.error("[ai] Provider failed, falling back to rules:", err.message);

    const rules = rulesBasedDiagnosis(type, context);
    return res.status(200).json({
      ...rules,
      ...links,
      fallback: true,
      fallbackReason: "provider_error",
    });
  }
}
