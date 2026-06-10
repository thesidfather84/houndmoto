/**
 * HoundMoto AI Provider Abstraction Layer
 *
 * Switch providers by setting the AI_PROVIDER environment variable.
 * No provider SDK is required — all calls use native fetch().
 *
 * Supported values:
 *   AI_PROVIDER=openai     → OpenAI Chat Completions API
 *   AI_PROVIDER=anthropic  → Anthropic Messages API
 *   AI_PROVIDER=gemini     → Google Gemini GenerateContent API
 *   AI_PROVIDER=local      → Any OpenAI-compatible local server (Ollama, LM Studio, etc.)
 *
 * Provider-specific env vars (set the ones matching your active provider):
 *   OPENAI_API_KEY     OPENAI_MODEL      (default: gpt-4o-mini)
 *   ANTHROPIC_API_KEY  ANTHROPIC_MODEL   (default: claude-haiku-4-5-20251001)
 *   GEMINI_API_KEY     GEMINI_MODEL      (default: gemini-1.5-flash)
 *   LOCAL_LLM_URL      LOCAL_LLM_MODEL   (defaults: http://localhost:11434/v1, llama3)
 */

// ── Provider registry ─────────────────────────────────────────────────────────

const REGISTRY = {
  openai: {
    displayName: "OpenAI",
    keyEnv: "OPENAI_API_KEY",
    modelEnv: "OPENAI_MODEL",
    defaultModel: "gpt-4o-mini",
  },
  anthropic: {
    displayName: "Anthropic",
    keyEnv: "ANTHROPIC_API_KEY",
    modelEnv: "ANTHROPIC_MODEL",
    defaultModel: "claude-haiku-4-5-20251001",
  },
  gemini: {
    displayName: "Google Gemini",
    keyEnv: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
    defaultModel: "gemini-1.5-flash",
  },
  local: {
    displayName: "Local LLM",
    keyEnv: null,
    modelEnv: "LOCAL_LLM_MODEL",
    defaultModel: "llama3",
  },
};

function getActiveProvider() {
  const id = (process.env.AI_PROVIDER || "").toLowerCase().trim();
  const config = REGISTRY[id] || null;
  return { id, config };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns true only when AI_PROVIDER is set to a known provider
 * AND the required API key (if any) is present.
 */
export function isAIConfigured() {
  const { id, config } = getActiveProvider();
  if (!id || !config) return false;
  if (config.keyEnv && !process.env[config.keyEnv]) return false;
  return true;
}

/**
 * Returns display info about the active provider, or null if unconfigured.
 */
export function getProviderInfo() {
  const { id, config } = getActiveProvider();
  if (!config) return null;
  return {
    id,
    displayName: config.displayName,
    model: process.env[config.modelEnv] || config.defaultModel,
  };
}

/**
 * Send a conversation to the active AI provider.
 *
 * @param {Array<{role: "system"|"user"|"assistant", content: string}>} messages
 * @param {object} opts
 * @param {number} [opts.maxTokens=800]
 * @param {number} [opts.temperature=0.3]
 * @returns {Promise<string>} Generated text
 * @throws {Error} If provider is unconfigured or the API call fails
 */
export async function callAI(messages, { maxTokens = 800, temperature = 0.3 } = {}) {
  const { id } = getActiveProvider();

  switch (id) {
    case "openai":    return _callOpenAI(messages, maxTokens, temperature);
    case "anthropic": return _callAnthropic(messages, maxTokens, temperature);
    case "gemini":    return _callGemini(messages, maxTokens, temperature);
    case "local":     return _callLocal(messages, maxTokens, temperature);
    default:
      throw new Error(
        `AI_PROVIDER "${id || "(not set)"}" is not supported. ` +
        `Valid values: openai, anthropic, gemini, local`
      );
  }
}

// ── Provider implementations ──────────────────────────────────────────────────

async function _callOpenAI(messages, maxTokens, temperature) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY environment variable is not set");

  const model = process.env.OPENAI_MODEL || REGISTRY.openai.defaultModel;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature }),
    signal: AbortSignal.timeout(8500),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenAI API error ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenAI returned an empty response");
  return text;
}

async function _callAnthropic(messages, maxTokens, temperature) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY environment variable is not set");

  const model = process.env.ANTHROPIC_MODEL || REGISTRY.anthropic.defaultModel;

  // Anthropic separates the system message from conversation messages
  const systemMsg = messages.find((m) => m.role === "system");
  const convo = messages.filter((m) => m.role !== "system");

  const body = { model, max_tokens: maxTokens, messages: convo };
  if (systemMsg) body.system = systemMsg.content;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8500),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Anthropic API error ${res.status}: ${errBody.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error("Anthropic returned an empty response");
  return text;
}

async function _callGemini(messages, maxTokens, temperature) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is not set");

  const model = process.env.GEMINI_MODEL || REGISTRY.gemini.defaultModel;

  // Gemini uses "user"/"model" roles; no "system" role.
  // Prepend system message text into the first user message.
  const systemMsg = messages.find((m) => m.role === "system");
  const convo = messages.filter((m) => m.role !== "system");

  const contents = convo.map((m, i) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: i === 0 && systemMsg ? `${systemMsg.content}\n\n${m.content}` : m.content }],
  }));

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: maxTokens, temperature },
    }),
    signal: AbortSignal.timeout(8500),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${errBody.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty or blocked response");
  return text;
}

async function _callLocal(messages, maxTokens, temperature) {
  const baseUrl = (process.env.LOCAL_LLM_URL || "http://localhost:11434/v1").replace(/\/$/, "");
  const model   = process.env.LOCAL_LLM_MODEL || REGISTRY.local.defaultModel;

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature }),
    signal: AbortSignal.timeout(30000), // local inference can be slower
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Local LLM error ${res.status}: ${errBody.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Local LLM returned an empty response");
  return text;
}
