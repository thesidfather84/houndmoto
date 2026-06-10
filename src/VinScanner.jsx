import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const VIN_RE      = /^[A-HJ-NPR-Z0-9]{17}$/i;
const VIN_INVALID = /[IOQ]/i;
const SCAN_ID     = "houndmoto-vin-scanner";
const SCAN_SECS   = 10;

const VIN_FORMATS = [
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.PDF_417,
  Html5QrcodeSupportedFormats.QR_CODE,
];

export function VinScanner({ onDetected, onClose }) {
  // status: starting | scanning | timeout | found | error | manual
  const [status,    setStatus]    = useState("starting");
  const [detected,  setDetected]  = useState("");
  const [errorMsg,  setErrorMsg]  = useState("");
  const [manualVin, setManualVin] = useState("");
  const [manualErr, setManualErr] = useState("");
  const [timeLeft,  setTimeLeft]  = useState(SCAN_SECS);

  const scannerRef = useRef(null);
  const timerRef   = useRef(null);
  const countRef   = useRef(null);

  function clearTimers() {
    if (timerRef.current)  { clearTimeout(timerRef.current);  timerRef.current  = null; }
    if (countRef.current)  { clearInterval(countRef.current); countRef.current  = null; }
  }

  function stopCamera() {
    clearTimers();
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {});
      scannerRef.current = null;
    }
  }

  function launchScanner() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      setErrorMsg(
        "Camera scanning requires HTTPS. Open the live HTTPS site, or enter the VIN manually below."
      );
      return;
    }

    setTimeLeft(SCAN_SECS);
    const scanner = new Html5Qrcode(SCAN_ID);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 260, height: 110 },
          formatsToSupport: VIN_FORMATS,
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
        },
        (text) => {
          const candidate = text.replace(/\s/g, "").toUpperCase();
          if (VIN_RE.test(candidate)) {
            stopCamera();
            setDetected(candidate);
            setStatus("found");
          }
        },
        () => {}
      )
      .then(() => {
        setStatus("scanning");
        timerRef.current = setTimeout(() => {
          stopCamera();
          setStatus("timeout");
        }, SCAN_SECS * 1000);
        countRef.current = setInterval(() => {
          setTimeLeft((t) => Math.max(0, t - 1));
        }, 1000);
      })
      .catch((err) => {
        const msg = (err?.message || err?.toString() || "").toLowerCase();
        setStatus("error");
        if (msg.includes("permission") || msg.includes("notallowed") || msg.includes("denied")) {
          setErrorMsg(
            "Camera permission is blocked. Allow camera access in Safari or Chrome settings, then try again — or enter the VIN manually below."
          );
        } else {
          setErrorMsg(
            "Camera could not be started. Try a different browser, or enter the VIN manually below."
          );
        }
      });
  }

  useEffect(() => {
    launchScanner();
    return () => stopCamera();
  }, []);

  function retry() {
    stopCamera();
    setDetected("");
    setManualVin("");
    setManualErr("");
    setStatus("starting");
    setTimeout(launchScanner, 150);
  }

  function enterManual() {
    stopCamera();
    setStatus("manual");
  }

  function handleManualChange(e) {
    const val = e.target.value.toUpperCase().slice(0, 17);
    setManualVin(val);
    setManualErr(
      VIN_INVALID.test(val)
        ? "VINs do not use I, O, or Q. Remove those characters."
        : ""
    );
  }

  function submitManual(e) {
    e?.preventDefault();
    const v = manualVin.trim();
    if (VIN_INVALID.test(v)) {
      setManualErr("VINs do not use I, O, or Q. Remove those characters.");
      return;
    }
    if (!VIN_RE.test(v)) {
      setManualErr("Enter a valid 17-character VIN.");
      return;
    }
    onDetected(v);
    onClose();
  }

  function confirm() {
    onDetected(detected);
    onClose();
  }

  const cameraActive   = status === "starting" || status === "scanning";
  const showManualForm = status === "error" || status === "timeout" || status === "manual";

  return (
    <div className="vinScanOverlay">
      <div className="vinScanModal">

        <div className="vinScanTopBar">
          <span className="brand" style={{ fontSize: "16px" }}>HoundMoto VIN Scanner</span>
          <button className="vzNavBtn" onClick={onClose}>✕ Close</button>
        </div>

        {/* Scan tips — shown while camera is running */}
        {cameraActive && (
          <div className="vinScanTips">
            <p className="vinScanTip">
              📋 Door jamb sticker barcodes scan best. Windshield VIN plates may be harder to scan due to glare.
            </p>
            <p className="vinScanTip">💡 Use bright light and hold the phone steady.</p>
            <p className="vinScanTip">🔄 Try landscape mode if portrait does not scan.</p>
          </div>
        )}

        {/* Camera viewport — kept in DOM while camera is active so html5-qrcode can attach */}
        <div
          id={SCAN_ID}
          className="vinScanViewport"
          style={{ display: cameraActive ? "block" : "none" }}
        />

        {status === "starting" && (
          <p className="vinScanStatus">Starting camera…</p>
        )}
        {status === "scanning" && (
          <>
            <p className="vinScanStatus">
              Scanning for VIN barcode…{timeLeft > 0 ? ` (${timeLeft}s)` : ""}
            </p>
            <p className="vinScanOrient">Rotate phone for a better angle</p>
          </>
        )}

        {/* 10-second timeout fallback */}
        {status === "timeout" && (
          <div className="vinScanTimeout">
            <p className="vinScanTimeoutMsg">Couldn't scan automatically.</p>
            <div className="vinScanActions">
              <button className="houndBtn" onClick={retry}>Try Again</button>
              <button className="vzNavBtn" onClick={enterManual}>Enter VIN Manually</button>
            </div>
          </div>
        )}

        {/* Successful scan */}
        {status === "found" && (
          <div className="vinScanResult">
            <div className="vinScanResultIcon">✓</div>
            <p className="vinScanResultLabel">VIN Detected</p>
            <div className="vinScanResultVin">{detected}</div>
            <p className="vinScanResultNote">
              Verify this matches your door jamb sticker before continuing.
            </p>
            <div className="vinScanActions">
              <button className="houndBtn" onClick={confirm}>Use This VIN →</button>
              <button className="vzNavBtn" onClick={retry}>Scan Again</button>
            </div>
          </div>
        )}

        {/* Camera error */}
        {status === "error" && (
          <div className="vinScanError">
            <p className="vinScanErrorMsg">{errorMsg}</p>
          </div>
        )}

        {/* Manual VIN entry form — shown for error, timeout, or manual mode */}
        {showManualForm && (
          <form className="vinManualForm" onSubmit={submitManual}>
            <p className="vinManualLabel">Enter 17-character VIN:</p>
            <input
              className="vinManualInput"
              value={manualVin}
              onChange={handleManualChange}
              placeholder="e.g. 1FTEW1EP8JFB12345"
              maxLength={17}
              spellCheck={false}
              autoCapitalize="characters"
              autoCorrect="off"
              autoComplete="off"
              inputMode="text"
              autoFocus
            />
            {manualErr && <p className="vinManualError">{manualErr}</p>}
            <p className="vinManualCount">{manualVin.length}/17 characters</p>
            <button
              className="houndBtn"
              type="submit"
              disabled={manualVin.length !== 17 || Boolean(manualErr)}
            >
              Use This VIN →
            </button>
            {status !== "manual" && (
              <button
                type="button"
                className="vzNavBtn"
                style={{ marginTop: "8px" }}
                onClick={retry}
              >
                ← Try Camera Again
              </button>
            )}
          </form>
        )}

        {/* Persistent manual escape while camera is running */}
        {cameraActive && (
          <div className="vinScanManual">
            <p className="vinScanHintSub">
              Scanner having trouble? Type the 17-character VIN instead.
            </p>
            <button className="vzNavBtn" onClick={enterManual}>Enter VIN Manually</button>
          </div>
        )}

      </div>
    </div>
  );
}
