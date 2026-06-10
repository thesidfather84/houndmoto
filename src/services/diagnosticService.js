/**
 * Frontend diagnostic service.
 *
 * Calls /api/ai and handles all failure modes so the UI never breaks.
 * The component calling this never needs to know which AI provider is active.
 */

const LOCAL_FALLBACK = {
  text: "Diagnostic service is temporarily unavailable. Your DTC codes, vehicle specs, and recall information below are unaffected and fully functional.",
  source: "offline",
  fallback: true,
  fallbackReason: "network_error",
  urgency: "unknown",
  safetyNote: null,
  system: null,
};

/**
 * Request a diagnosis from the backend.
 *
 * @param {"symptom"|"dtc"|"vehicle"} type
 * @param {object} context
 *   symptom: { symptoms: string, vehicle?: { year, make, model, engine } }
 *   dtc:     { dtcCode: string, vehicle?: { year, make, model, engine } }
 *   vehicle: { vehicle: object, question: string }
 * @returns {Promise<{
 *   text: string,
 *   source: string,
 *   fallback: boolean,
 *   fallbackReason?: string,
 *   urgency?: string,
 *   safetyNote?: string,
 *   system?: string,
 *   dtcLink?: string,
 *   recallLink?: string,
 * }>}
 */
export async function diagnose(type, context) {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, context }),
      signal: AbortSignal.timeout(12000),
    });

    // Non-2xx is an infrastructure error — fall back gracefully
    if (!res.ok) {
      console.warn(`[diagnosticService] /api/ai returned ${res.status}`);
      return { ...LOCAL_FALLBACK, dtcLink: "/dtc", recallLink: "/vin-recall-check" };
    }

    return await res.json();
  } catch (err) {
    // Network timeout, offline, CORS, etc.
    console.warn("[diagnosticService] fetch failed:", err.message);
    return { ...LOCAL_FALLBACK, dtcLink: "/dtc", recallLink: "/vin-recall-check" };
  }
}

/**
 * Returns true if the AI endpoint appears to be reachable.
 * Used to decide whether to show the input form or a maintenance notice.
 */
export async function checkAIAvailability() {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "symptom", context: { symptoms: "ping" } }),
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
