/**
 * HoundMoto Phase 1 Coverage Report
 * Shows data migration statistics and coverage gaps
 */

import { getCoverageStats } from '../utils/vehicleDataLoader';

export function CoverageReport() {
  const stats = getCoverageStats();

  return (
    <div className="coverageReport">
      <h2>📊 HoundMoto Data Coverage</h2>
      <p className="coverageSubtitle">Phase 1 Migration Status</p>

      <div className="coverageGrid">
        <div className="coverageStat">
          <div className="coverageNumber">{stats.total}</div>
          <div className="coverageLabel">Total Vehicles Recognized</div>
          <p className="coverageNote">From vehicleDirectory.js</p>
        </div>

        <div className="coverageStat">
          <div className="coverageNumber">{stats.withSpecs}</div>
          <div className="coverageLabel">Vehicles with Complete Specs</div>
          <div className="coveragePercent">{stats.coverage.specs}%</div>
          <p className="coverageNote">Oil, fluid, tire, battery data</p>
        </div>

        <div className="coverageStat">
          <div className="coverageNumber">{stats.withFailures}</div>
          <div className="coverageLabel">Vehicles with Common Failures</div>
          <div className="coveragePercent">{stats.coverage.failures}%</div>
          <p className="coverageNote">Known problems for each generation</p>
        </div>

        <div className="coverageStat">
          <div className="coverageNumber">{stats.withDTC}</div>
          <div className="coverageLabel">Vehicles with DTC Mappings</div>
          <div className="coveragePercent">{stats.coverage.dtc}%</div>
          <p className="coverageNote">Vehicle-specific diagnostic codes</p>
        </div>
      </div>

      <div className="coverageGaps">
        <h3>Coverage Gaps</h3>
        <ul>
          <li>
            <strong>{stats.total - stats.withSpecs} vehicles ({100 - stats.coverage.specs}%)</strong> need specs data
            <p>Priority: Oil type, transmission fluid, tire size, battery group</p>
          </li>
          <li>
            <strong>{stats.total - stats.withFailures} vehicles ({100 - stats.coverage.failures}%)</strong> need common failures
            <p>Priority: Most common issues per generation</p>
          </li>
          <li>
            <strong>{stats.total - stats.withDTC} vehicles ({100 - stats.coverage.dtc}%)</strong> need vehicle-specific DTC mappings
            <p>Priority: Top 5 codes per vehicle generation</p>
          </li>
        </ul>
      </div>

      <div className="coverageNextSteps">
        <h3>Phase 1 Complete ✅</h3>
        <ul>
          <li>✅ Created /src/data/vehicles/ folder structure</li>
          <li>✅ Generated vehicles.json from scattered data files</li>
          <li>✅ Created vehicle-index.json for fast lookups</li>
          <li>✅ Updated VehiclePage.jsx to read new data (with fallback)</li>
          <li>✅ Data loader utility (vehicleDataLoader.js) with hybrid logic</li>
        </ul>

        <h3>Phase 2 Ready (Next)</h3>
        <ul>
          <li>❌ Expand vehicle specs (50 → 100+)</li>
          <li>❌ Add common failures for all vehicles</li>
          <li>❌ Add vehicle-specific DTC mappings</li>
          <li>❌ Add maintenance schedules</li>
          <li>❌ Update more components to use new data</li>
        </ul>
      </div>

      <style>{`
        .coverageReport {
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          margin: 2rem 0;
        }

        .coverageReport h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
        }

        .coverageSubtitle {
          margin: 0 0 2rem 0;
          opacity: 0.9;
        }

        .coverageGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .coverageStat {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 8px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .coverageNumber {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .coverageLabel {
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          opacity: 0.95;
        }

        .coveragePercent {
          font-size: 1.3rem;
          font-weight: 600;
          color: #ffd700;
          margin-bottom: 0.5rem;
        }

        .coverageNote {
          font-size: 0.85rem;
          opacity: 0.8;
          margin: 0;
        }

        .coverageGaps {
          background: rgba(255, 255, 255, 0.15);
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .coverageGaps h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .coverageGaps ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .coverageGaps li {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .coverageGaps li strong {
          color: #ffd700;
        }

        .coverageGaps li p {
          margin: 0.25rem 0 0 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .coverageNextSteps {
          background: rgba(255, 255, 255, 0.15);
          padding: 1.5rem;
          border-radius: 8px;
        }

        .coverageNextSteps h3 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
        }

        .coverageNextSteps ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }

        .coverageNextSteps li {
          padding: 0.3rem 0;
          padding-left: 1.8rem;
          position: relative;
        }

        .coverageNextSteps li::before {
          content: '✅';
          position: absolute;
          left: 0;
        }

        .coverageNextSteps li:empty-before::before {
          content: '❌';
        }
      `}</style>
    </div>
  );
}

export default CoverageReport;
