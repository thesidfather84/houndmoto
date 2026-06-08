// HoundMoto DTC Code Database — SAE J2012 Generic OBD-II P-Codes
// Covers P0100–P0799 (most commonly searched codes)

export const troubleCodes = [

  // ─── P0100–P0199: Air / Fuel Metering Sensors ───────────────────────────────

  { code: "P0100", title: "Mass Air Flow (MAF) Sensor Circuit Malfunction",
    causes: "Dirty MAF sensor, wiring/connector issue, intake air leak",
    severity: "Medium",
    steps: "Clean MAF sensor with MAF-safe spray cleaner. Check wiring connector. If code returns, test MAF output voltage at idle vs spec." },

  { code: "P0101", title: "MAF Sensor Circuit Range / Performance",
    causes: "Dirty or damaged MAF sensor, intake air leak after filter, vacuum leak, wiring",
    severity: "Medium",
    steps: "Clean MAF sensor. Check air filter condition and all intake hose connections. Clear and retest. If it returns, test MAF output signal." },

  { code: "P0102", title: "MAF Sensor Circuit Low Input",
    causes: "MAF sensor failure, open or short in wiring, poor connector",
    severity: "Medium",
    steps: "Inspect wiring and connector. Test MAF signal voltage. A reading near 0V at idle (should be ~0.5–1V) indicates sensor or wiring failure." },

  { code: "P0103", title: "MAF Sensor Circuit High Input",
    causes: "MAF sensor failure, shorted wiring, poor ground",
    severity: "Medium",
    steps: "Check for shorted wiring between MAF and PCM. Test sensor output voltage. Replace sensor if out of spec." },

  { code: "P0105", title: "Manifold Absolute Pressure (MAP) Sensor Circuit Malfunction",
    causes: "Faulty MAP sensor, vacuum line leak or disconnected, wiring issue",
    severity: "Medium",
    steps: "Inspect MAP sensor vacuum line — disconnected or cracked hoses are common. Test sensor voltage. Replace sensor if wiring is intact." },

  { code: "P0106", title: "MAP Sensor Circuit Range / Performance",
    causes: "MAP sensor out of range, vacuum leak, clogged sensor port",
    severity: "Medium",
    steps: "Check vacuum line to MAP sensor for leaks and kinks. Compare MAP voltage to expected values at idle and key-on. Replace if faulty." },

  { code: "P0107", title: "MAP Sensor Circuit Low Input",
    causes: "Open circuit in wiring, MAP sensor failure, vacuum line issue",
    severity: "Medium",
    steps: "Check voltage at MAP sensor connector (reference should be 5V). Low or no signal points to wiring open or sensor failure." },

  { code: "P0108", title: "MAP Sensor Circuit High Input",
    causes: "MAP sensor failure, shorted signal wire, vacuum line disconnected",
    severity: "Medium",
    steps: "Inspect vacuum line. Check for a shorted signal wire. Replace MAP sensor if reference and ground circuits are intact." },

  { code: "P0110", title: "Intake Air Temperature (IAT) Sensor Circuit Malfunction",
    causes: "IAT sensor failure, wiring issue, connector corrosion",
    severity: "Low",
    steps: "Inspect connector for corrosion. Test IAT sensor resistance at a known temp (should change with temperature). Replace if failed." },

  { code: "P0111", title: "IAT Sensor Circuit Range / Performance",
    causes: "IAT sensor reading implausible, intermittent connection",
    severity: "Low",
    steps: "Compare IAT reading to ambient temperature with cold engine. A large difference indicates sensor or wiring issue." },

  { code: "P0112", title: "IAT Sensor Circuit Low Input",
    causes: "IAT sensor shorted, wiring shorted to ground",
    severity: "Low",
    steps: "Test IAT resistance. Short to ground in signal wire will show low resistance — trace and repair wiring." },

  { code: "P0113", title: "IAT Sensor Circuit High Input",
    causes: "IAT sensor open circuit, broken wire, corroded connector",
    severity: "Low to medium",
    steps: "Inspect connector for corrosion. Test sensor resistance (should be high-resistance on open, low on heat). Replace if out of spec." },

  { code: "P0115", title: "Engine Coolant Temperature (ECT) Sensor Circuit Malfunction",
    causes: "ECT sensor failure, wiring issue, low coolant level",
    severity: "Medium",
    steps: "Check coolant level first. Inspect sensor connector. Test sensor resistance vs temperature chart for your vehicle." },

  { code: "P0116", title: "ECT Sensor Circuit Range / Performance",
    causes: "ECT sensor reading inconsistent with engine warm-up pattern, air pocket near sensor",
    severity: "Medium",
    steps: "Verify coolant level and bleed air from system. Check that engine reaches normal operating temperature. Test sensor." },

  { code: "P0117", title: "ECT Sensor Circuit Low Input",
    causes: "ECT sensor shorted, wiring shorted to ground, connector issue",
    severity: "Medium",
    steps: "Test sensor resistance — a short to ground drives reading low. Check connector and harness. Replace sensor if failed." },

  { code: "P0118", title: "ECT Sensor Circuit High Input",
    causes: "ECT sensor open circuit, broken wire, connector corrosion",
    severity: "Medium",
    steps: "Inspect connector for corrosion or damage. Test resistance — open circuit drives reading high. Replace sensor." },

  { code: "P0120", title: "Throttle Position Sensor (TPS) A Circuit Malfunction",
    causes: "TPS failure, wiring issue, throttle body carbon buildup",
    severity: "Medium",
    steps: "Clean throttle body. Test TPS voltage sweep from idle to WOT (should sweep smoothly without dead spots). Replace if erratic." },

  { code: "P0121", title: "TPS A Circuit Range / Performance",
    causes: "TPS signal out of expected range, carbon buildup on throttle plate",
    severity: "Medium",
    steps: "Clean throttle body. Check TPS voltage at idle (typically 0.5V) and WOT (typically 4.5V). Replace TPS if sweep is non-linear." },

  { code: "P0122", title: "TPS A Circuit Low Input",
    causes: "TPS failure, wiring shorted to ground, poor connector",
    severity: "Medium",
    steps: "Check reference voltage at TPS (should be 5V). Low signal indicates wiring short or sensor failure." },

  { code: "P0123", title: "TPS A Circuit High Input",
    causes: "TPS failure, signal wire shorted to voltage, poor ground",
    severity: "Medium",
    steps: "Inspect TPS connector and wiring. Test signal voltage — a value near 5V at idle indicates sensor or wiring failure." },

  { code: "P0125", title: "ECT Insufficient for Closed Loop Fuel Control",
    causes: "Thermostat stuck open, ECT sensor failure, extended idle in cold weather",
    severity: "Low to medium",
    steps: "Monitor coolant temp with a scan tool — if it never reaches operating temp, replace thermostat first." },

  { code: "P0128", title: "Coolant Temp Below Thermostat Regulating Temperature",
    causes: "Stuck-open thermostat, ECT sensor failure, wiring",
    severity: "Low to medium",
    steps: "Replace thermostat first — most common fix. Clear code and retest. If it returns, test the ECT sensor." },

  { code: "P0130", title: "O2 Sensor Circuit (Bank 1, Sensor 1)",
    causes: "Failed upstream O2 sensor, wiring issue, exhaust leak near sensor",
    severity: "Medium",
    steps: "Check for exhaust leaks before the sensor. Test O2 sensor voltage — upstream sensor should switch rapidly between 0.1–0.9V at operating temp." },

  { code: "P0131", title: "O2 Sensor Circuit Low Voltage (Bank 1, Sensor 1)",
    causes: "O2 sensor failed lean, fuel delivery problem, exhaust leak",
    severity: "Medium",
    steps: "Check for exhaust leaks. Verify fuel pressure. Test sensor output — a sensor stuck near 0.1V indicates failure." },

  { code: "P0132", title: "O2 Sensor Circuit High Voltage (Bank 1, Sensor 1)",
    causes: "O2 sensor failed rich, fuel system issue, wiring shorted to voltage",
    severity: "Medium",
    steps: "Verify no rich condition (check fuel trims). Test O2 sensor — a sensor stuck near 0.9V indicates failure." },

  { code: "P0133", title: "O2 Sensor Circuit Slow Response (Bank 1, Sensor 1)",
    causes: "Aging O2 sensor, sensor contaminated by coolant or oil, exhaust leak",
    severity: "Medium",
    steps: "Check for coolant or oil burning. Monitor sensor switching frequency — a healthy sensor switches >8 times per 10 seconds at warm idle." },

  { code: "P0134", title: "O2 Sensor Circuit No Activity (Bank 1, Sensor 1)",
    causes: "O2 sensor heater failure, open circuit wiring, failed sensor",
    severity: "Medium",
    steps: "Check heater circuit fuse. Test heater resistance. If heater works but sensor shows no voltage activity, replace sensor." },

  { code: "P0135", title: "O2 Sensor Heater Circuit Malfunction (Bank 1, Sensor 1)",
    causes: "Failed upstream O2 sensor heater, broken wiring, blown fuse",
    severity: "Medium",
    steps: "Check heater fuse first. Test heater element resistance (2–30 ohms is typical). Replace sensor if heater circuit is open." },

  { code: "P0136", title: "O2 Sensor Circuit (Bank 1, Sensor 2)",
    causes: "Failed downstream O2 sensor, wiring issue, exhaust leak",
    severity: "Low to medium",
    steps: "Downstream O2 sensor (after cat) — verify wiring first. Test sensor output. Downstream sensor should be relatively steady near 0.6–0.8V on a healthy cat." },

  { code: "P0137", title: "O2 Sensor Circuit Low Voltage (Bank 1, Sensor 2)",
    causes: "Failed downstream sensor, wiring issue",
    severity: "Low to medium",
    steps: "Test downstream O2 sensor output. A reading stuck low may indicate sensor failure or an exhaust leak before the sensor." },

  { code: "P0138", title: "O2 Sensor Circuit High Voltage (Bank 1, Sensor 2)",
    causes: "Failed downstream sensor, fuel system running rich",
    severity: "Low to medium",
    steps: "Check for rich condition (check fuel trims for positive values). Test downstream sensor — stuck high near 0.9V indicates sensor failure." },

  { code: "P0139", title: "O2 Sensor Circuit Slow Response (Bank 1, Sensor 2)",
    causes: "Aging downstream sensor, poor sensor ground",
    severity: "Low",
    steps: "Downstream sensors wear over time. Replace if vehicle has high mileage and sensor has not been changed." },

  { code: "P0140", title: "O2 Sensor Circuit No Activity (Bank 1, Sensor 2)",
    causes: "Failed downstream O2 sensor, open circuit wiring",
    severity: "Low to medium",
    steps: "Check connector and wiring. Test sensor output — no voltage activity at operating temp indicates sensor failure." },

  { code: "P0141", title: "O2 Sensor Heater Circuit (Bank 1, Sensor 2)",
    causes: "Failed downstream O2 sensor heater, broken wiring, blown fuse",
    severity: "Low to medium",
    steps: "Check heater fuse. Test heater resistance. Replace sensor if heater circuit is open or shorted." },

  { code: "P0150", title: "O2 Sensor Circuit (Bank 2, Sensor 1)",
    causes: "Failed upstream O2 sensor Bank 2, wiring issue, exhaust leak",
    severity: "Medium",
    steps: "Same procedure as P0130 but for Bank 2 (V6/V8 engines only). Identify Bank 2 location for your specific engine before testing." },

  { code: "P0151", title: "O2 Sensor Circuit Low Voltage (Bank 2, Sensor 1)",
    causes: "Bank 2 upstream O2 sensor failed lean, fuel or exhaust issue",
    severity: "Medium",
    steps: "Check for exhaust leaks on Bank 2 side. Test O2 sensor voltage and switching." },

  { code: "P0152", title: "O2 Sensor Circuit High Voltage (Bank 2, Sensor 1)",
    causes: "Bank 2 upstream O2 sensor failed rich, wiring issue",
    severity: "Medium",
    steps: "Verify fuel trims. Test sensor output — stuck high indicates sensor failure." },

  { code: "P0153", title: "O2 Sensor Circuit Slow Response (Bank 2, Sensor 1)",
    causes: "Aging upstream O2 sensor Bank 2, sensor contamination",
    severity: "Medium",
    steps: "Monitor sensor switching frequency on Bank 2. Replace if response is slow." },

  { code: "P0154", title: "O2 Sensor Circuit No Activity (Bank 2, Sensor 1)",
    causes: "Failed Bank 2 upstream sensor, open circuit wiring",
    severity: "Medium",
    steps: "Check heater circuit and wiring. Test sensor voltage output at operating temp." },

  { code: "P0155", title: "O2 Sensor Heater Circuit Malfunction (Bank 2, Sensor 1)",
    causes: "Failed upstream O2 sensor Bank 2, wiring issue, blown fuse",
    severity: "Medium",
    steps: "Same as P0135 but for Bank 2. Verify Bank 2 location. Check fuse, test heater resistance, replace sensor if needed." },

  { code: "P0156", title: "O2 Sensor Circuit (Bank 2, Sensor 2)",
    causes: "Failed downstream O2 sensor Bank 2, wiring issue",
    severity: "Low to medium",
    steps: "Check wiring and connector on Bank 2 downstream sensor. Test output voltage." },

  { code: "P0157", title: "O2 Sensor Circuit Low Voltage (Bank 2, Sensor 2)",
    causes: "Failed Bank 2 downstream sensor, wiring issue",
    severity: "Low",
    steps: "Test downstream sensor on Bank 2. Replace if stuck low." },

  { code: "P0158", title: "O2 Sensor Circuit High Voltage (Bank 2, Sensor 2)",
    causes: "Failed Bank 2 downstream sensor, rich condition",
    severity: "Low",
    steps: "Check fuel trims. Test downstream sensor — stuck high indicates failure." },

  { code: "P0159", title: "O2 Sensor Circuit Slow Response (Bank 2, Sensor 2)",
    causes: "Aging downstream sensor Bank 2",
    severity: "Low",
    steps: "Replace if high mileage and sensor has not been serviced." },

  { code: "P0160", title: "O2 Sensor Circuit No Activity (Bank 2, Sensor 2)",
    causes: "Failed Bank 2 downstream sensor, open circuit wiring",
    severity: "Low to medium",
    steps: "Inspect connector and wiring. Replace sensor if no activity at operating temp." },

  { code: "P0161", title: "O2 Sensor Heater Circuit (Bank 2, Sensor 2)",
    causes: "Failed downstream O2 sensor heater Bank 2, wiring, blown fuse",
    severity: "Low to medium",
    steps: "Check heater fuse. Test heater resistance. Replace sensor if heater circuit is open." },

  { code: "P0170", title: "Fuel Trim Malfunction Bank 1",
    causes: "Vacuum leak, MAF sensor issue, fuel system problem, O2 sensor",
    severity: "Medium",
    steps: "Check long-term and short-term fuel trims with a scan tool. Positive trims (lean) point to vacuum leak or MAF issue. Negative trims (rich) point to fuel or injector issues." },

  { code: "P0171", title: "System Too Lean Bank 1",
    causes: "Vacuum leak, dirty MAF sensor, weak fuel pump, clogged injectors, exhaust leak",
    severity: "Medium",
    steps: "Check for vacuum leaks (spray carb cleaner at idle near intake seams). Clean MAF. Check fuel pressure. Inspect exhaust manifold for cracks." },

  { code: "P0172", title: "System Too Rich Bank 1",
    causes: "Leaking fuel injector, failed O2 sensor, high fuel pressure, coolant leak into combustion",
    severity: "Medium",
    steps: "Check fuel pressure. Inspect injectors for leaks. Test upstream O2 sensor. Check for coolant loss or white smoke (head gasket)." },

  { code: "P0173", title: "Fuel Trim Malfunction Bank 2",
    causes: "Vacuum leak, MAF sensor issue, fuel system issue on Bank 2 side",
    severity: "Medium",
    steps: "Same diagnostic approach as P0170 but focus on Bank 2 side of the engine." },

  { code: "P0174", title: "System Too Lean Bank 2",
    causes: "Vacuum leak on Bank 2 side, MAF sensor, fuel delivery issue",
    severity: "Medium",
    steps: "Same as P0171 but focus diagnostics on the Bank 2 side. Common on V6/V8 engines." },

  { code: "P0175", title: "System Too Rich Bank 2",
    causes: "Leaking injector Bank 2 side, O2 sensor, high fuel pressure",
    severity: "Medium",
    steps: "Same as P0172 but for Bank 2. Check injectors and O2 sensor on that bank." },

  { code: "P0190", title: "Fuel Rail Pressure Sensor Circuit",
    causes: "Faulty fuel rail pressure sensor, wiring issue, actual fuel pressure problem",
    severity: "Medium",
    steps: "Verify actual fuel pressure with a gauge. Test sensor reference voltage and signal. Replace sensor if wiring is intact but reading is wrong." },

  { code: "P0191", title: "Fuel Rail Pressure Sensor Range / Performance",
    causes: "Fuel rail pressure sensor out of range, fuel pump issue, wiring",
    severity: "Medium",
    steps: "Test actual fuel pressure. Compare to sensor reading. Discrepancy indicates sensor failure; matching pressure problem indicates fuel pump or regulator." },

  { code: "P0192", title: "Fuel Rail Pressure Sensor Circuit Low Input",
    causes: "Sensor failed, signal wire open or shorted, connector issue",
    severity: "Medium",
    steps: "Check sensor reference voltage (5V). Low signal indicates sensor or wiring failure." },

  { code: "P0193", title: "Fuel Rail Pressure Sensor Circuit High Input",
    causes: "Signal wire shorted to voltage, sensor failure",
    severity: "Medium",
    steps: "Test signal wire for short to power. Replace sensor if wiring checks out." },

  // ─── P0200–P0299: Fuel Injectors ────────────────────────────────────────────

  { code: "P0200", title: "Injector Circuit Malfunction",
    causes: "Wiring harness issue, injector driver failure in PCM, multiple injector faults",
    severity: "High",
    steps: "Check injector connector resistance and wiring. If multiple injectors are involved, suspect a common power or ground issue. Individual cylinder codes (P0201–P0208) give more detail." },

  { code: "P0201", title: "Injector Circuit Malfunction — Cylinder 1",
    causes: "Failed fuel injector, open or shorted injector wiring, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance (typically 12–16 ohms). Listen for injector click at startup. Check wiring to injector 1. Replace injector if resistance is out of spec." },

  { code: "P0202", title: "Injector Circuit Malfunction — Cylinder 2",
    causes: "Failed fuel injector, wiring issue, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance and wiring on cylinder 2. Replace injector if out of spec." },

  { code: "P0203", title: "Injector Circuit Malfunction — Cylinder 3",
    causes: "Failed fuel injector, wiring issue, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance and wiring on cylinder 3. Replace injector if out of spec." },

  { code: "P0204", title: "Injector Circuit Malfunction — Cylinder 4",
    causes: "Failed fuel injector, wiring issue, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance and wiring on cylinder 4. Replace injector if out of spec." },

  { code: "P0205", title: "Injector Circuit Malfunction — Cylinder 5",
    causes: "Failed fuel injector, wiring issue, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance and wiring on cylinder 5. Replace injector if out of spec." },

  { code: "P0206", title: "Injector Circuit Malfunction — Cylinder 6",
    causes: "Failed fuel injector, wiring issue, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance and wiring on cylinder 6. Replace injector if out of spec." },

  { code: "P0207", title: "Injector Circuit Malfunction — Cylinder 7",
    causes: "Failed fuel injector, wiring issue, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance and wiring on cylinder 7. Replace injector if out of spec." },

  { code: "P0208", title: "Injector Circuit Malfunction — Cylinder 8",
    causes: "Failed fuel injector, wiring issue, PCM driver failure",
    severity: "High",
    steps: "Test injector resistance and wiring on cylinder 8. Replace injector if out of spec." },

  { code: "P0217", title: "Engine Overtemperature Condition",
    causes: "Low coolant, failed water pump, stuck thermostat, blown head gasket, failed radiator fan",
    severity: "High — stop driving immediately",
    steps: "Do not drive with this code active. Allow engine to cool. Check coolant level. Inspect for leaks. Verify radiator fans operate. Do not ignore overheating." },

  { code: "P0230", title: "Fuel Pump Primary Circuit Malfunction",
    causes: "Failed fuel pump, blown fuse, relay failure, wiring issue",
    severity: "High",
    steps: "Check fuel pump fuse and relay first. Test for voltage at fuel pump connector with key on. Listen for pump prime sound. Replace relay, pump, or repair wiring as needed." },

  { code: "P0231", title: "Fuel Pump Secondary Circuit Low",
    causes: "Fuel pump relay failure, wiring issue, pump failure",
    severity: "High",
    steps: "Check relay and fuse. Test pump circuit voltage." },

  { code: "P0232", title: "Fuel Pump Secondary Circuit High",
    causes: "Wiring short to voltage in pump circuit",
    severity: "Medium to high",
    steps: "Inspect pump wiring harness for shorts. Check relay." },

  // ─── P0300–P0399: Misfire / Ignition ────────────────────────────────────────

  { code: "P0300", title: "Random / Multiple Cylinder Misfire Detected",
    causes: "Worn spark plugs, ignition coils, vacuum leak, fuel delivery issue, compression problem",
    severity: "Medium to high",
    steps: "Inspect spark plugs. Swap coils between cylinders to isolate. Check for vacuum leaks. Test fuel pressure. Run compression test if misfire persists after ignition service." },

  { code: "P0301", title: "Cylinder 1 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 1",
    severity: "Medium to high",
    steps: "Swap cylinder 1 coil to another cylinder. If misfire code moves, replace the coil. If it stays on cylinder 1, check plug, injector, and compression." },

  { code: "P0302", title: "Cylinder 2 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 2",
    severity: "Medium to high",
    steps: "Swap cylinder 2 coil to another cylinder. If misfire moves, replace coil. If it stays, check plug, injector, and compression." },

  { code: "P0303", title: "Cylinder 3 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 3",
    severity: "Medium to high",
    steps: "Swap cylinder 3 coil. If misfire moves, replace coil. If it stays, inspect plug, injector, and compression." },

  { code: "P0304", title: "Cylinder 4 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 4",
    severity: "Medium to high",
    steps: "Swap cylinder 4 coil. If misfire moves, replace coil. If it stays, inspect plug, injector, and compression." },

  { code: "P0305", title: "Cylinder 5 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 5",
    severity: "Medium to high",
    steps: "Swap cylinder 5 coil. If misfire moves, replace coil. If it stays, inspect plug, injector, and compression." },

  { code: "P0306", title: "Cylinder 6 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 6",
    severity: "Medium to high",
    steps: "Swap cylinder 6 coil. If misfire moves, replace coil. If it stays, inspect plug, injector, and compression." },

  { code: "P0307", title: "Cylinder 7 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 7",
    severity: "Medium to high",
    steps: "Swap cylinder 7 coil. If misfire moves, replace coil. If it stays, inspect plug, injector, and compression." },

  { code: "P0308", title: "Cylinder 8 Misfire Detected",
    causes: "Spark plug, ignition coil, fuel injector, compression issue in cylinder 8",
    severity: "Medium to high",
    steps: "Swap cylinder 8 coil. If misfire moves, replace coil. If it stays, inspect plug, injector, and compression." },

  { code: "P0316", title: "Misfire Detected on Engine Startup (First 1000 Revolutions)",
    causes: "Cold-start misfire — spark plugs, injectors, fuel pressure, compression",
    severity: "Medium",
    steps: "This code captures misfires only on startup. Check spark plugs (carbon-fouled plugs misfire cold). Test injectors. Check compression if plugs are good." },

  { code: "P0320", title: "Ignition / Distributor Engine Speed Input Circuit",
    causes: "Crankshaft or camshaft position sensor issue, distributor (older vehicles), wiring",
    severity: "High",
    steps: "Check crankshaft and camshaft position sensor wiring. This code can prevent the engine from starting." },

  { code: "P0325", title: "Knock Sensor 1 Circuit Malfunction (Bank 1)",
    causes: "Failed knock sensor, wiring issue, loose knock sensor",
    severity: "Low to medium",
    steps: "Check knock sensor connector and torque (most sensors have a specific torque spec). Test sensor resistance. Replace sensor if failed." },

  { code: "P0326", title: "Knock Sensor 1 Circuit Range / Performance (Bank 1)",
    causes: "Knock sensor loose, wiring intermittent, actual engine knock",
    severity: "Medium",
    steps: "Verify sensor torque. Check for actual engine knock (detonation). Replace sensor if wiring is intact but code persists." },

  { code: "P0327", title: "Knock Sensor 1 Circuit Low Input (Bank 1)",
    causes: "Knock sensor failure, wiring shorted to ground",
    severity: "Low to medium",
    steps: "Test knock sensor resistance. Check for wiring short. Replace sensor if out of spec." },

  { code: "P0328", title: "Knock Sensor 1 Circuit High Input (Bank 1)",
    causes: "Knock sensor failure, signal wire shorted to voltage",
    severity: "Low to medium",
    steps: "Test knock sensor resistance. Check for wiring short to power. Replace sensor if needed." },

  { code: "P0330", title: "Knock Sensor 2 Circuit Malfunction (Bank 2)",
    causes: "Failed knock sensor Bank 2, wiring issue, loose sensor",
    severity: "Low to medium",
    steps: "Same as P0325 but for Bank 2. Check sensor connector, torque, and resistance." },

  { code: "P0335", title: "Crankshaft Position Sensor A Circuit",
    causes: "Failed crankshaft position sensor, wiring issue, damaged tone wheel (reluctor ring)",
    severity: "High",
    steps: "Check sensor wiring and connector. Test sensor resistance. A failed crank sensor can prevent the engine from starting. Inspect reluctor ring for missing teeth if sensor tests good." },

  { code: "P0336", title: "Crankshaft Position Sensor A Circuit Range / Performance",
    causes: "Damaged reluctor ring (missing teeth), intermittent sensor, wiring",
    severity: "High",
    steps: "Inspect reluctor ring for damage with a scope or by visual inspection if accessible. Check sensor air gap. May cause intermittent no-start." },

  { code: "P0337", title: "Crankshaft Position Sensor A Circuit Low Input",
    causes: "Crank sensor failure, wiring open or shorted to ground",
    severity: "High",
    steps: "Test sensor voltage and resistance. Check for wiring open or short. This can cause no-start." },

  { code: "P0338", title: "Crankshaft Position Sensor A Circuit High Input",
    causes: "Signal wire shorted to voltage, sensor failure",
    severity: "High",
    steps: "Check for wiring short. Replace sensor if wiring is good." },

  { code: "P0339", title: "Crankshaft Position Sensor A Circuit Intermittent",
    causes: "Loose sensor, damaged wiring, reluctor ring issue",
    severity: "High",
    steps: "Check sensor mounting and connector. Inspect wiring for chafing. May cause intermittent stalling or no-start." },

  { code: "P0340", title: "Camshaft Position Sensor A Circuit (Bank 1 or Single Cam)",
    causes: "Bad camshaft position sensor, wiring issue, reluctor ring damage, timing chain problem",
    severity: "High",
    steps: "Inspect wiring and connector. Test sensor resistance per vehicle spec. Replace sensor if wiring is good. If code returns after replacement, check timing chain." },

  { code: "P0341", title: "Camshaft Position Sensor A Circuit Range / Performance",
    causes: "Timing chain stretched or jumped, cam sensor damaged, intermittent wiring",
    severity: "High",
    steps: "Check timing chain condition if sensor tests good. A stretched chain causes cam/crank correlation errors." },

  { code: "P0342", title: "Camshaft Position Sensor A Circuit Low Input",
    causes: "Cam sensor failure, wiring open or short to ground",
    severity: "High",
    steps: "Test sensor resistance and signal. Check wiring for open circuit." },

  { code: "P0343", title: "Camshaft Position Sensor A Circuit High Input",
    causes: "Signal wire short to voltage, sensor failure",
    severity: "High",
    steps: "Check wiring for short to power. Replace sensor if wiring is good." },

  { code: "P0345", title: "Camshaft Position Sensor A Circuit (Bank 2)",
    causes: "Failed cam sensor Bank 2, wiring issue, timing chain",
    severity: "High",
    steps: "Same as P0340 but for Bank 2 intake cam sensor on V6/V8 engines." },

  { code: "P0350", title: "Ignition Coil Primary / Secondary Circuit",
    causes: "Failed ignition coil, wiring issue, coil driver in PCM",
    severity: "High",
    steps: "Check coil connectors. Test primary coil resistance. Replace coil if out of spec. If multiple coils fail together, suspect a coil power or ground issue." },

  { code: "P0351", title: "Ignition Coil A Primary / Secondary Circuit",
    causes: "Failed coil on cylinder 1 position, wiring issue",
    severity: "High",
    steps: "Test coil A primary resistance. Swap with known-good coil to confirm. Check wiring." },

  { code: "P0352", title: "Ignition Coil B Primary / Secondary Circuit",
    causes: "Failed coil on cylinder 2 position, wiring issue",
    severity: "High",
    steps: "Test coil B primary resistance. Swap with known-good coil to confirm." },

  { code: "P0353", title: "Ignition Coil C Primary / Secondary Circuit",
    causes: "Failed coil on cylinder 3 position, wiring issue",
    severity: "High",
    steps: "Test coil C. Swap with known-good coil to confirm." },

  { code: "P0354", title: "Ignition Coil D Primary / Secondary Circuit",
    causes: "Failed coil on cylinder 4 position, wiring issue",
    severity: "High",
    steps: "Test coil D. Swap with known-good coil to confirm." },

  { code: "P0355", title: "Ignition Coil E Primary / Secondary Circuit",
    causes: "Failed coil on cylinder 5 position, wiring issue",
    severity: "High",
    steps: "Test coil E. Swap with known-good coil to confirm." },

  { code: "P0356", title: "Ignition Coil F Primary / Secondary Circuit",
    causes: "Failed coil on cylinder 6 position, wiring issue",
    severity: "High",
    steps: "Test coil F. Swap with known-good coil to confirm." },

  { code: "P0380", title: "Glow Plug / Heater Circuit A (Diesel)",
    causes: "Failed glow plug(s), glow plug relay, wiring issue",
    severity: "Medium",
    steps: "Diesel engines only. Test each glow plug resistance (should be near 0 ohms). Test relay operation. Hard cold starts often indicate glow plug failure." },

  // ─── P0400–P0499: Emission Controls ─────────────────────────────────────────

  { code: "P0400", title: "EGR Flow Malfunction",
    causes: "EGR valve stuck closed or clogged, vacuum line issue, DPFE sensor, wiring",
    severity: "Medium",
    steps: "Inspect EGR valve for carbon buildup. Test valve operation (apply vacuum — should open). Check vacuum line and DPFE sensor if equipped." },

  { code: "P0401", title: "EGR Flow Insufficient",
    causes: "Clogged EGR valve or passages, failed EGR solenoid, DPFE sensor failure",
    severity: "Medium",
    steps: "Remove EGR valve and inspect for heavy carbon. Clean or replace. Check EGR passages in the intake manifold. Test DPFE sensor on Ford vehicles." },

  { code: "P0402", title: "EGR Flow Excessive",
    causes: "EGR valve stuck open, DPFE sensor, vacuum leak at EGR",
    severity: "Medium",
    steps: "Check EGR valve for stuck-open condition. Test DPFE sensor (Ford). A rough idle at warm idle often accompanies this code." },

  { code: "P0403", title: "EGR Circuit Malfunction",
    causes: "EGR solenoid failure, wiring issue, PCM output problem",
    severity: "Medium",
    steps: "Test EGR solenoid resistance. Check wiring to solenoid. Apply 12V to solenoid to verify it operates." },

  { code: "P0404", title: "EGR Circuit Range / Performance",
    causes: "EGR valve position sensor issue, carbon-fouled EGR valve, wiring",
    severity: "Medium",
    steps: "Clean EGR valve. Test position sensor if equipped. Replace EGR valve if sensor tests good but valve movement is restricted." },

  { code: "P0405", title: "EGR Position Sensor A Circuit Low",
    causes: "EGR position sensor failure, wiring shorted to ground",
    severity: "Medium",
    steps: "Test EGR position sensor voltage. Low signal indicates sensor or wiring failure." },

  { code: "P0406", title: "EGR Position Sensor A Circuit High",
    causes: "EGR position sensor failure, signal wire shorted to voltage",
    severity: "Medium",
    steps: "Test EGR position sensor. Check for wiring short to power." },

  { code: "P0410", title: "Secondary Air Injection System Malfunction",
    causes: "Failed air pump, stuck air injection solenoid, vacuum line issue, check valve failure",
    severity: "Medium",
    steps: "Listen for air pump operation on cold start. Test pump relay and fuse. Inspect air injection hoses and check valves for blockage." },

  { code: "P0420", title: "Catalyst System Efficiency Below Threshold (Bank 1)",
    causes: "Worn catalytic converter, upstream or downstream O2 sensor issue, exhaust leak, engine running rich",
    severity: "Medium",
    steps: "Check for exhaust leaks before the cat first. Test upstream and downstream O2 sensor waveforms. Rule out sensor and engine issues before replacing the converter." },

  { code: "P0421", title: "Warm Up Catalyst Efficiency Below Threshold (Bank 1)",
    causes: "Warm-up catalytic converter worn, O2 sensor issue",
    severity: "Medium",
    steps: "Same diagnostic approach as P0420 — check O2 sensors and exhaust leaks before replacing the converter." },

  { code: "P0430", title: "Catalyst System Efficiency Below Threshold (Bank 2)",
    causes: "Worn catalytic converter Bank 2, O2 sensor issue, exhaust leak",
    severity: "Medium",
    steps: "Same as P0420 but for Bank 2. On V6/V8 vehicles, each bank has its own catalyst." },

  { code: "P0440", title: "EVAP Emission Control System Malfunction",
    causes: "Gas cap issue, EVAP purge or vent valve failure, EVAP canister, leak in EVAP hoses",
    severity: "Low",
    steps: "Check gas cap first. Inspect EVAP hoses for cracks. Test purge and vent solenoids. Use smoke test to find specific leak." },

  { code: "P0441", title: "EVAP System Incorrect Purge Flow",
    causes: "Purge valve stuck closed or open, vacuum line issue, PCM not commanding purge",
    severity: "Low",
    steps: "Test EVAP purge solenoid — apply 12V to verify it opens. Check vacuum line from intake to purge valve." },

  { code: "P0442", title: "EVAP System Small Leak Detected",
    causes: "Loose gas cap, cracked EVAP hose, purge valve sealing issue, vent valve",
    severity: "Low",
    steps: "Tighten or replace gas cap and clear code. If it returns, use smoke test to find the leak in EVAP hoses or canister." },

  { code: "P0443", title: "EVAP Purge Control Valve Circuit",
    causes: "Failed EVAP purge solenoid, wiring issue",
    severity: "Low",
    steps: "Test purge solenoid resistance (typically 20–30 ohms). Check wiring. Replace solenoid if out of spec." },

  { code: "P0446", title: "EVAP Emission Control System Vent Control Circuit",
    causes: "Failed EVAP vent solenoid, wiring issue, blocked vent filter",
    severity: "Low",
    steps: "Test vent solenoid resistance and operation. Inspect vent filter at canister for blockage." },

  { code: "P0449", title: "EVAP Vent Valve / Solenoid Circuit",
    causes: "Failed vent solenoid, wiring, connector corrosion",
    severity: "Low",
    steps: "Test vent solenoid resistance. Check connector for corrosion. Replace solenoid if failed." },

  { code: "P0450", title: "EVAP Pressure Sensor Circuit",
    causes: "Failed EVAP pressure sensor, wiring issue",
    severity: "Low",
    steps: "Test EVAP pressure sensor. Check wiring. Replace sensor if out of spec." },

  { code: "P0452", title: "EVAP Pressure Sensor Circuit Low Input",
    causes: "EVAP pressure sensor failure, wiring short to ground",
    severity: "Low",
    steps: "Test sensor voltage reference and signal. Low reading indicates sensor or wiring failure." },

  { code: "P0453", title: "EVAP Pressure Sensor Circuit High Input",
    causes: "EVAP pressure sensor failure, signal wire short to voltage",
    severity: "Low",
    steps: "Test sensor. Check for wiring short to power. Replace sensor if needed." },

  { code: "P0455", title: "EVAP System Large Leak Detected",
    causes: "Missing or loose gas cap, cracked EVAP hose, purge or vent valve leak",
    severity: "Low to medium",
    steps: "Check gas cap first — missing or very loose cap is most common. If cap is tight, use smoke test to locate leak in EVAP system." },

  { code: "P0456", title: "EVAP System Very Small Leak Detected",
    causes: "Very small crack in EVAP hose, gas cap sealing slightly, micro-leak in valve",
    severity: "Low",
    steps: "Start with gas cap replacement. If code returns, use smoke machine to find small leak — these can be difficult to locate." },

  { code: "P0457", title: "EVAP System Leak Detected — Fuel Cap Loose / Off",
    causes: "Gas cap left off, loose gas cap, damaged gas cap seal",
    severity: "Low",
    steps: "Tighten or replace gas cap. Verify cap threads and seal are intact. Clear code." },

  { code: "P0460", title: "Fuel Level Sensor Circuit",
    causes: "Fuel level sender failure, wiring issue, float stuck",
    severity: "Low",
    steps: "Check fuel level sender resistance (varies by vehicle — full vs empty resistance specs). Replace sender if out of spec." },

  { code: "P0461", title: "Fuel Level Sensor Circuit Range / Performance",
    causes: "Fuel level sender intermittent, float stuck, wiring",
    severity: "Low",
    steps: "Monitor fuel level sender reading with scan tool while moving vehicle (slosh test). Intermittent readings indicate failing sender." },

  { code: "P0480", title: "Cooling Fan Relay 1 Control Circuit",
    causes: "Failed cooling fan relay, wiring issue, PCM output failure",
    severity: "Medium",
    steps: "Test cooling fan relay. Verify relay socket for corrosion. Check for power and ground at relay. Replace relay if failed." },

  { code: "P0481", title: "Cooling Fan Relay 2 Control Circuit",
    causes: "Failed fan relay 2, wiring issue",
    severity: "Medium",
    steps: "Test fan relay 2. Check wiring. Replace relay if failed." },

  // ─── P0500–P0599: Vehicle Speed / Idle / Auxiliary ──────────────────────────

  { code: "P0500", title: "Vehicle Speed Sensor (VSS) Circuit Malfunction",
    causes: "Failed VSS, wiring issue, reluctor ring damage on axle or transmission output",
    severity: "Medium",
    steps: "Check VSS connector and wiring. Test sensor output while moving vehicle (if accessible). Speedometer not working is a common symptom." },

  { code: "P0501", title: "VSS Circuit Range / Performance",
    causes: "VSS signal erratic, reluctor ring damage, intermittent wiring",
    severity: "Medium",
    steps: "Check for damaged reluctor ring. Inspect wiring. Test sensor output." },

  { code: "P0502", title: "VSS Circuit Low Input",
    causes: "VSS failure, wiring open or short, reluctor ring issue",
    severity: "Medium",
    steps: "Test sensor output while driving. Check wiring. Replace sensor if no output." },

  { code: "P0503", title: "VSS Circuit Intermittent / Erratic / High",
    causes: "Loose VSS connection, damaged wiring, reluctor ring",
    severity: "Medium",
    steps: "Inspect connector and wiring for intermittent connection. Check reluctor ring for damage or debris." },

  { code: "P0505", title: "Idle Control System Malfunction",
    causes: "Dirty throttle body, failed IAC valve, vacuum leak, throttle position sensor",
    severity: "Low to medium",
    steps: "Clean throttle body. Test IAC valve response. Check for vacuum leaks at idle. Inspect TPS." },

  { code: "P0506", title: "Idle Air Control System RPM Lower Than Expected",
    causes: "Carbon buildup in throttle body, IAC valve stuck, vacuum leak",
    severity: "Low to medium",
    steps: "Clean throttle body and IAC valve. Check for vacuum leaks causing a lean stumble at idle." },

  { code: "P0507", title: "Idle Air Control System RPM Higher Than Expected",
    causes: "Vacuum leak, dirty throttle body, failed IAC valve, TPS issue",
    severity: "Low to medium",
    steps: "Clean throttle body first. Inspect for vacuum leaks. Test IAC valve operation. Check TPS output." },

  { code: "P0512", title: "Starter Request Circuit",
    causes: "Ignition switch issue, starter relay, wiring, neutral safety switch",
    severity: "Medium",
    steps: "Check neutral safety switch or clutch switch. Test ignition switch. Verify starter relay." },

  { code: "P0513", title: "Incorrect Immobilizer Key",
    causes: "Wrong key, damaged key chip (transponder), faulty immobilizer module",
    severity: "High — may prevent starting",
    steps: "Try a spare key. If spare works, original key transponder is damaged. If neither works, have immobilizer system diagnosed at a dealer." },

  { code: "P0520", title: "Engine Oil Pressure Sensor / Switch Circuit",
    causes: "Failed oil pressure sensor/switch, wiring issue, actual low oil pressure",
    severity: "High",
    steps: "Check oil level first. Verify actual oil pressure with a mechanical gauge before condemning the sensor. Low actual pressure means an engine issue — do not drive." },

  { code: "P0521", title: "Engine Oil Pressure Sensor Range / Performance",
    causes: "Oil pressure sensor reading out of range, actual pressure concern",
    severity: "High",
    steps: "Verify actual oil pressure with a mechanical gauge. If pressure is correct, replace the sensor." },

  { code: "P0522", title: "Engine Oil Pressure Sensor Circuit Low",
    causes: "Oil pressure sensor failed, wiring short to ground",
    severity: "High",
    steps: "Test with mechanical gauge first. If pressure is normal, replace oil pressure sensor." },

  { code: "P0523", title: "Engine Oil Pressure Sensor Circuit High",
    causes: "Oil pressure sensor failure, signal wire short to voltage",
    severity: "Medium",
    steps: "Test sensor. Check for wiring short to power. Replace sensor if wiring is intact." },

  { code: "P0524", title: "Engine Oil Pressure Too Low",
    causes: "Low oil level, worn oil pump, worn engine bearings, clogged oil pickup, wrong viscosity oil",
    severity: "High — stop engine immediately",
    steps: "Stop driving. Check oil level immediately. If level is correct and pressure is confirmed low with a mechanical gauge, do not start — engine damage will occur." },

  { code: "P0530", title: "A/C Refrigerant Pressure Sensor Circuit",
    causes: "Failed A/C pressure sensor, wiring issue",
    severity: "Low",
    steps: "Test A/C pressure sensor. Check wiring. Replace sensor if failed. Check actual refrigerant charge." },

  { code: "P0560", title: "System Voltage",
    causes: "Charging system issue, weak battery, corroded battery cables, bad alternator",
    severity: "Medium",
    steps: "Test battery voltage (should be 12.4–12.7V resting). Test charging voltage (should be 13.5–14.8V running). Clean battery terminals. Test alternator output." },

  { code: "P0562", title: "System Voltage Low",
    causes: "Weak or failing battery, alternator not charging, corroded cables, high electrical load",
    severity: "Medium to high",
    steps: "Test battery and alternator. A failing alternator will cause system voltage to drop while running. Check for parasitic draw if battery keeps going dead." },

  { code: "P0563", title: "System Voltage High",
    causes: "Overcharging alternator, voltage regulator failure",
    severity: "Medium",
    steps: "Test charging voltage at battery with engine running. Over 14.8V indicates a regulator or alternator issue. Overcharging can damage electronics." },

  { code: "P0571", title: "Cruise Control / Brake Switch A Circuit",
    causes: "Brake switch failure, wiring issue",
    severity: "Low",
    steps: "Test brake light switch function. A faulty brake switch can disable cruise control and affect ABS operation." },

  // ─── P0600–P0699: Computer / Module / Electrical ────────────────────────────

  { code: "P0600", title: "Serial Communication Link",
    causes: "Communication failure between modules, wiring issue, module failure",
    severity: "Medium to high",
    steps: "Scan all modules for codes. Check for CAN bus wiring issues. Module communication failures often show up as multiple codes." },

  { code: "P0601", title: "Internal Control Module Memory Check Sum Error",
    causes: "PCM/ECM internal failure, power interruption during programming",
    severity: "High",
    steps: "This typically requires PCM replacement or reprogramming by a dealer. Check for TSBs specific to your vehicle." },

  { code: "P0602", title: "Control Module Programming Error",
    causes: "Incomplete or failed PCM programming, wrong software calibration",
    severity: "High",
    steps: "Requires dealer or professional reprogramming of the PCM." },

  { code: "P0603", title: "Internal Control Module Keep Alive Memory (KAM) Error",
    causes: "Battery disconnected with modules powered, PCM internal failure",
    severity: "Medium",
    steps: "Clear code and retest. This sometimes clears after a drive cycle following battery service. If it persists, PCM may need replacement." },

  { code: "P0604", title: "Internal Control Module RAM Error",
    causes: "PCM/ECM internal failure",
    severity: "High",
    steps: "PCM replacement typically required. Check for updated software or TSBs before replacing." },

  { code: "P0605", title: "Internal Control Module ROM Error",
    causes: "PCM/ECM internal failure, corrupted software",
    severity: "High",
    steps: "Attempt PCM reprogramming first. Replace PCM if reprogramming fails." },

  { code: "P0606", title: "PCM / ECM Processor Fault",
    causes: "PCM internal failure",
    severity: "High",
    steps: "Usually requires PCM replacement. Check for TSBs and software updates first." },

  { code: "P0615", title: "Starter Relay Circuit",
    causes: "Failed starter relay, wiring issue, ignition switch",
    severity: "Medium to high",
    steps: "Test starter relay. Check for power and ground at relay. Test ignition switch starter terminal." },

  { code: "P0620", title: "Generator / Alternator Control Circuit",
    causes: "Alternator failure, wiring issue, PCM output failure",
    severity: "Medium to high",
    steps: "Test alternator output. Check wiring from PCM to alternator field terminal. Alternator may need replacement." },

  { code: "P0627", title: "Fuel Pump A Control Circuit Open",
    causes: "Fuel pump relay failure, wiring open, PCM output failure",
    severity: "High",
    steps: "Check fuel pump relay and fuse. Test for power at pump with key on. No prime sound on key-on indicates no power to pump." },

  { code: "P0638", title: "Throttle Actuator Control Range / Performance (Bank 1)",
    causes: "Electronic throttle body issue, throttle position sensor, wiring",
    severity: "High",
    steps: "On drive-by-wire vehicles, this indicates an electronic throttle problem. Clean throttle body. Test TPS. May require throttle body replacement." },

  { code: "P0645", title: "A/C Clutch Relay Control Circuit",
    causes: "Failed A/C clutch relay, wiring issue, PCM output",
    severity: "Low",
    steps: "Test A/C relay. Check wiring. Replace relay if failed." },

  { code: "P0650", title: "MIL (Check Engine Light) Control Circuit",
    causes: "Wiring issue to MIL, instrument cluster problem, PCM output",
    severity: "Low",
    steps: "Verify MIL bulb is good. Check wiring. This code does not affect drivability." },

  // ─── P0700–P0799: Transmission ───────────────────────────────────────────────

  { code: "P0700", title: "Transmission Control System Malfunction",
    causes: "Transmission-specific fault stored in TCM — P0700 is a pointer code, not the root cause",
    severity: "High",
    steps: "P0700 is a flag code. Scan the TCM for additional transmission-specific codes. Diagnose those codes first — P0700 clears once the root fault is resolved." },

  { code: "P0701", title: "Transmission Control System Range / Performance",
    causes: "TCM performance issue, wiring, sensor input problem",
    severity: "High",
    steps: "Scan for additional TCM codes. Check transmission fluid level and condition. Inspect wiring harness." },

  { code: "P0702", title: "Transmission Control System Electrical",
    causes: "Electrical fault in transmission control circuit, wiring, TCM failure",
    severity: "High",
    steps: "Inspect transmission wiring harness. Check TCM power and ground. Scan for additional codes." },

  { code: "P0705", title: "Transmission Range Sensor Circuit (PRNDL Input)",
    causes: "Failed neutral safety switch / range sensor, wiring, adjustment",
    severity: "Medium to high",
    steps: "Check transmission range sensor (neutral safety switch) adjustment. Test sensor resistance across gear positions. Replace if out of spec." },

  { code: "P0706", title: "Transmission Range Sensor Circuit Range / Performance",
    causes: "Range sensor out of adjustment, sensor failure, wiring",
    severity: "Medium",
    steps: "Check sensor adjustment (some are adjustable). Test resistance at each gear position." },

  { code: "P0710", title: "Transmission Fluid Temperature Sensor Circuit",
    causes: "Failed transmission fluid temp sensor, wiring issue",
    severity: "Medium",
    steps: "Test sensor resistance. A high or low reading at operating temp indicates sensor failure. Check transmission fluid condition." },

  { code: "P0711", title: "Transmission Fluid Temp Sensor Range / Performance",
    causes: "Sensor reading implausible, intermittent connection",
    severity: "Medium",
    steps: "Compare sensor reading to actual fluid temp. Test wiring for intermittent connections." },

  { code: "P0712", title: "Transmission Fluid Temp Sensor Circuit Low Input",
    causes: "Sensor shorted, wiring short to ground",
    severity: "Medium",
    steps: "Test sensor resistance. Shorted sensor reads as extremely cold. Check wiring." },

  { code: "P0713", title: "Transmission Fluid Temp Sensor Circuit High Input",
    causes: "Sensor open circuit, wiring open",
    severity: "Medium",
    steps: "Test sensor resistance. Open circuit reads as extremely hot. Replace sensor." },

  { code: "P0715", title: "Input / Turbine Speed Sensor Circuit",
    causes: "Failed input shaft speed sensor, wiring issue, debris in transmission",
    severity: "High",
    steps: "Check sensor connector and wiring. Test sensor resistance. Transmission may not shift properly with this code." },

  { code: "P0716", title: "Input / Turbine Speed Sensor Circuit Range / Performance",
    causes: "Speed sensor signal erratic, debris, wiring",
    severity: "High",
    steps: "Inspect sensor connector. Check for metallic debris on sensor tip (indicates internal transmission wear)." },

  { code: "P0717", title: "Input / Turbine Speed Sensor Circuit No Signal",
    causes: "Failed input speed sensor, broken wiring, damaged tone wheel",
    severity: "High",
    steps: "Test sensor resistance. Check for damage to tone wheel inside transmission." },

  { code: "P0720", title: "Output Speed Sensor Circuit",
    causes: "Failed output shaft speed sensor, wiring issue",
    severity: "High",
    steps: "Check sensor connector and wiring. Test sensor resistance. This sensor affects shift points and speedometer." },

  { code: "P0721", title: "Output Speed Sensor Circuit Range / Performance",
    causes: "Erratic output speed signal, sensor, wiring",
    severity: "High",
    steps: "Test sensor. Check for debris on sensor tip." },

  { code: "P0722", title: "Output Speed Sensor Circuit No Signal",
    causes: "Failed output speed sensor, broken wiring",
    severity: "High",
    steps: "Test sensor resistance and output. Replace sensor if failed." },

  { code: "P0730", title: "Incorrect Gear Ratio",
    causes: "Worn clutch packs, failed shift solenoid, low transmission fluid, internal damage",
    severity: "High",
    steps: "Check transmission fluid level and condition first. Scan for additional solenoid codes. A gear ratio error often indicates worn clutch packs requiring rebuild." },

  { code: "P0731", title: "Gear 1 Incorrect Ratio",
    causes: "First gear clutch pack worn, solenoid issue, fluid pressure",
    severity: "High",
    steps: "Check fluid level and condition. Verify no solenoid codes. Incorrect ratio in a specific gear usually points to clutch pack failure in that gear." },

  { code: "P0732", title: "Gear 2 Incorrect Ratio",
    causes: "Second gear clutch pack worn, solenoid issue",
    severity: "High",
    steps: "Check fluid. Inspect for additional solenoid codes." },

  { code: "P0733", title: "Gear 3 Incorrect Ratio",
    causes: "Third gear clutch pack worn, solenoid issue",
    severity: "High",
    steps: "Check fluid. Inspect for additional solenoid codes." },

  { code: "P0734", title: "Gear 4 Incorrect Ratio",
    causes: "Fourth gear clutch pack worn, solenoid issue",
    severity: "High",
    steps: "Check fluid. Inspect for additional solenoid codes." },

  { code: "P0735", title: "Gear 5 Incorrect Ratio",
    causes: "Fifth gear clutch pack worn, solenoid issue",
    severity: "High",
    steps: "Check fluid. Inspect for additional solenoid codes." },

  { code: "P0740", title: "Torque Converter Clutch (TCC) Circuit",
    causes: "Failed TCC solenoid, wiring issue, hydraulic pressure",
    severity: "High",
    steps: "Test TCC solenoid resistance. Check wiring. Low fluid pressure can also prevent TCC engagement." },

  { code: "P0741", title: "Torque Converter Clutch Circuit Performance or Stuck Off",
    causes: "TCC solenoid stuck, worn TCC, low fluid pressure, wiring",
    severity: "High",
    steps: "Check fluid level and condition. Test TCC solenoid. A failed TCC causes poor fuel economy and overheating on highway." },

  { code: "P0742", title: "Torque Converter Clutch Circuit Stuck On",
    causes: "TCC solenoid stuck on, contaminated fluid, valve body issue",
    severity: "High",
    steps: "Stalling at stops is a common symptom. Check fluid condition. TCC solenoid or valve body service often required." },

  { code: "P0743", title: "Torque Converter Clutch Circuit Electrical",
    causes: "TCC solenoid wiring issue, PCM output, connector corrosion",
    severity: "High",
    steps: "Test TCC solenoid resistance and wiring. Check connector inside transmission pan." },

  { code: "P0745", title: "Pressure Control Solenoid A",
    causes: "Failed pressure control solenoid, wiring, contaminated fluid",
    severity: "High",
    steps: "Check fluid level and condition. Test solenoid resistance. Service valve body if fluid is contaminated. Replace solenoid if out of spec." },

  { code: "P0750", title: "Shift Solenoid A",
    causes: "Failed shift solenoid A, wiring issue, contaminated fluid",
    severity: "High",
    steps: "Check transmission fluid condition. Test solenoid A resistance. Flush/refill if fluid is contaminated. Replace solenoid if failed." },

  { code: "P0751", title: "Shift Solenoid A Performance or Stuck Off",
    causes: "Solenoid A stuck off, contaminated fluid, wiring",
    severity: "High",
    steps: "Check fluid condition. Replace solenoid A if stuck. Valve body service if contamination is present." },

  { code: "P0752", title: "Shift Solenoid A Stuck On",
    causes: "Solenoid A stuck on, contaminated fluid, valve body issue",
    severity: "High",
    steps: "Check fluid. Service solenoid A or valve body." },

  { code: "P0753", title: "Shift Solenoid A Electrical",
    causes: "Solenoid A wiring issue, connector corrosion, open or short circuit",
    severity: "High",
    steps: "Test solenoid A resistance at connector inside pan. Check external wiring harness." },

  { code: "P0755", title: "Shift Solenoid B",
    causes: "Failed shift solenoid B, wiring issue, contaminated fluid",
    severity: "High",
    steps: "Same as P0750 but for solenoid B. Check fluid, test solenoid resistance, replace if failed." },

  { code: "P0756", title: "Shift Solenoid B Performance or Stuck Off",
    causes: "Solenoid B stuck off, fluid contamination",
    severity: "High",
    steps: "Check fluid condition. Replace solenoid B if stuck." },

  { code: "P0757", title: "Shift Solenoid B Stuck On",
    causes: "Solenoid B stuck on, fluid contamination",
    severity: "High",
    steps: "Service solenoid B or valve body." },

  { code: "P0758", title: "Shift Solenoid B Electrical",
    causes: "Solenoid B wiring issue, connector corrosion",
    severity: "High",
    steps: "Test solenoid B resistance and external wiring." },

  { code: "P0760", title: "Shift Solenoid C",
    causes: "Failed shift solenoid C, wiring, contaminated fluid",
    severity: "High",
    steps: "Check fluid. Test solenoid C. Replace if failed." },

  { code: "P0763", title: "Shift Solenoid C Electrical",
    causes: "Solenoid C wiring issue, connector corrosion",
    severity: "High",
    steps: "Test solenoid C resistance and wiring." },

  { code: "P0765", title: "Shift Solenoid D",
    causes: "Failed shift solenoid D, wiring, contaminated fluid",
    severity: "High",
    steps: "Check fluid. Test solenoid D. Replace if failed." },

  { code: "P0770", title: "Shift Solenoid E",
    causes: "Failed shift solenoid E, wiring, contaminated fluid",
    severity: "High",
    steps: "Check fluid. Test solenoid E. Replace if failed." },

  { code: "P0780", title: "Shift Malfunction",
    causes: "General transmission shift problem — low fluid, worn clutches, solenoid failure",
    severity: "High",
    steps: "Check fluid level and condition immediately. Scan for more specific solenoid or pressure codes. A shift malfunction without other codes may indicate internal wear." },

  { code: "P0781", title: "1-2 Shift Malfunction",
    causes: "Shift solenoid, 1-2 clutch pack, low fluid pressure",
    severity: "High",
    steps: "Verify fluid level. Check for solenoid codes. 1-2 shift problem often indicates 1st/2nd gear clutch pack failure." },

  { code: "P0782", title: "2-3 Shift Malfunction",
    causes: "Shift solenoid, 2-3 clutch pack, low fluid pressure",
    severity: "High",
    steps: "Verify fluid. Check solenoid codes. 2-3 clutch pack may be worn." },

  { code: "P0783", title: "3-4 Shift Malfunction",
    causes: "Shift solenoid, 3-4 clutch pack, low fluid pressure",
    severity: "High",
    steps: "Verify fluid. Check solenoid codes." },

  { code: "P0784", title: "4-5 Shift Malfunction",
    causes: "Shift solenoid, 4-5 clutch pack, low fluid pressure",
    severity: "High",
    steps: "Verify fluid. Check solenoid codes." },

];
