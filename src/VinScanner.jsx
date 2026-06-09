import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;
const SCAN_ID = "houndmoto-vin-scanner";

const VIN_FORMATS = [
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.PDF_417,
];

const SCAN_CONFIG = {
  fps: 10,
  qrbox: { width: 280, height: 120 },
  formatsToSupport: VIN_FORMATS,
  rememberLastUsedCamera: true,
  showTorchButtonIfSupported: true,
};

export function VinScanner({ onDetected, onClose }) {
  const [status, setStatus] = useState("starting");
  const [detected, setDetected] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const scannerRef = useRef(null);

  function launchScanner() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      setErrorMsg(
        "Camera scanning requires HTTPS or a secure browser context. Please open the live HTTPS site or enter the VIN manually."
      );
      return;
    }

    const scanner = new Html5Qrcode(SCAN_ID);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        SCAN_CONFIG,
        (text) => {
          const candidate = text.replace(/\s/g, "").toUpperCase();
          if (VIN_RE.test(candidate)) {
            scanner.stop().catch(() => {});
            setDetected(candidate);
            setStatus("found");
          }
        },
        () => {}
      )
      .then(() => setStatus("scanning"))
      .catch((err) => {
        setStatus("error");
        setErrorMsg(
          err.toString().includes("permission")
            ? "Camera access denied. Please allow camera permission in your browser settings."
            : "Camera could not be started. Try using a different browser or entering the VIN manually."
        );
      });
  }

  useEffect(() => {
    launchScanner();
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  function confirm() {
    onDetected(detected);
    onClose();
  }

  function retry() {
    const old = scannerRef.current;
    if (old) old.stop().catch(() => {});
    scannerRef.current = null;
    setDetected("");
    setStatus("starting");
    // Small delay so the DOM element re-renders visible before scanner attaches
    setTimeout(launchScanner, 100);
  }

  return (
    <div className="vinScanOverlay">
      <div className="vinScanModal">
        <div className="vinScanTopBar">
          <span className="brand" style={{ fontSize: "16px" }}>HoundMoto VIN Scanner</span>
          <button className="vzNavBtn" onClick={onClose}>✕ Close</button>
        </div>

        {status !== "found" && status !== "error" && (
          <>
            <p className="vinScanHint">
              Point the camera at the <strong>VIN barcode</strong> on the driver-side door jamb sticker.
            </p>
            <p className="vinScanHintSub">Hold steady — scanning automatically.</p>
          </>
        )}

        {/* Scanner viewport — only shown while scanning */}
        <div
          id={SCAN_ID}
          className="vinScanViewport"
          style={{ display: status === "found" || status === "error" ? "none" : "block" }}
        />

        {status === "starting" && (
          <p className="vinScanStatus">Starting camera…</p>
        )}

        {status === "scanning" && (
          <p className="vinScanStatus">Scanning for VIN barcode…</p>
        )}

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
              <button className="wzNavBtn" onClick={retry}>Scan Again</button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="vinScanError">
            <p className="vinScanErrorMsg">{errorMsg}</p>
            <p className="vinScanHintSub">
              You can still enter the VIN manually in the search bar.
            </p>
            <button className="wzNavBtn" style={{ marginTop: "12px" }} onClick={onClose}>
              ← Back to Search
            </button>
          </div>
        )}

        {status !== "error" && status !== "found" && (
          <div className="vinScanManual">
            <p className="vinScanHintSub">Barcode not scanning?</p>
            <button className="wzNavBtn" onClick={onClose}>Enter VIN manually</button>
          </div>
        )}
      </div>
    </div>
  );
}
