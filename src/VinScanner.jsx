import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;
const SCAN_ID = "houndmoto-vin-scanner";

export function VinScanner({ onDetected, onClose }) {
  const [status, setStatus] = useState("starting"); // starting | scanning | found | error
  const [detected, setDetected] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5Qrcode(SCAN_ID);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 280, height: 120 },
          // support both QR and 1D barcodes (VINs are Code-128, Code-39, or PDF417)
          formatsToSupport: [
            Html5Qrcode.SUPPORT_FORMAT?.QR_CODE,
            Html5Qrcode.SUPPORT_FORMAT?.CODE_128,
            Html5Qrcode.SUPPORT_FORMAT?.CODE_39,
            Html5Qrcode.SUPPORT_FORMAT?.PDF_417,
            Html5Qrcode.SUPPORT_FORMAT?.DATA_MATRIX,
          ].filter(Boolean),
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
        },
        (text) => {
          // Strip whitespace and check if valid 17-char VIN
          const candidate = text.replace(/\s/g, "").toUpperCase();
          if (VIN_RE.test(candidate)) {
            scanner.stop().catch(() => {});
            setDetected(candidate);
            setStatus("found");
          }
        },
        () => {
          // Per-frame decode failure — expected during scanning, ignore
        }
      )
      .then(() => setStatus("scanning"))
      .catch((err) => {
        setStatus("error");
        if (err.toString().includes("permission")) {
          setErrorMsg("Camera access denied. Please allow camera permission in your browser settings.");
        } else {
          setErrorMsg("Camera could not be started. Try using a different browser or entering the VIN manually.");
        }
      });

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
    setDetected("");
    setStatus("scanning");
    // Re-start scanning
    if (scannerRef.current) {
      scannerRef.current
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 280, height: 120 } },
          (text) => {
            const candidate = text.replace(/\s/g, "").toUpperCase();
            if (VIN_RE.test(candidate)) {
              scannerRef.current.stop().catch(() => {});
              setDetected(candidate);
              setStatus("found");
            }
          },
          () => {}
        )
        .catch(() => {});
    }
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
