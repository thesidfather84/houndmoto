import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DTC_RE = /^[PBCU]\d{4}$/i;

export function DtcLookup({ className = "", autoFocus = false }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit() {
    const clean = input.trim().toUpperCase();
    if (!DTC_RE.test(clean)) {
      setError("Enter a valid code like P0300.");
      return;
    }
    setError("");
    navigate(`/dtc/${clean.toLowerCase()}`);
  }

  return (
    <div className={`dtcLookupBox${className ? ` ${className}` : ""}`}>
      <div className="dtcLookupRow">
        <input
          className="dtcLookupInput"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Enter code like P0300, P0420, C1234"
          maxLength={6}
          autoCapitalize="characters"
          spellCheck={false}
          autoFocus={autoFocus}
        />
        <button className="dtcLookupBtn" onClick={submit}>
          Look Up Code
        </button>
      </div>
      {error && <p className="dtcLookupError">{error}</p>}
    </div>
  );
}
