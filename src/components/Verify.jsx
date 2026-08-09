import { FadeUp } from './ui'

const STEPS = [
  {
    n: '01',
    t: 'Bring the records together',
    d: 'Prepared checklist, commercial invoice, packing list, Bill of Lading/AWB, certificates, purchase order, and supporting documents.',
  },
  {
    n: '02',
    t: 'Cross-check trade-critical fields',
    d: 'Product description, HSN/ITC(HS) inputs, quantity, value, currency, country of origin, documents, tariff treatment, duty components, exemptions, and notifications.',
  },
  {
    n: '03',
    t: 'Review what needs attention',
    d: 'See the source values, the discrepancy, the potential reason, and the next question to resolve before filing.',
  },
]

const MINOR_ISSUES = [
  'Chapter 84 classification input requires review',
  'Notification / exemption eligibility needs verification',
  'Tariff & duty calculation differs from stated input',
  'Certificate reference missing from checklist',
]

export function Verify() {
  return (
    <section id="verify">
      <div className="wrap split">
        <FadeUp className="split-copy">
          <div className="eyebrow">VERIFY BEFORE FILING</div>
          <h2>Verify what goes into the filing.</h2>
          <p className="lead">
            Upload the prepared customs checklist with the documents behind it. Thavasi
            cross-checks the information, brings inconsistencies into focus, and helps your
            team review the important points before the filing moves forward.
          </p>
          {STEPS.map((step) => (
            <div className="step" key={step.n}>
              <div className="n">{step.n}</div>
              <div>
                <div className="t">{step.t}</div>
                <div className="d">{step.d}</div>
              </div>
            </div>
          ))}
        </FadeUp>
        <FadeUp className="split-panel">
          <div className="review-panel">
            <div className="rp-head">
              <span>Pre-filing review</span>
              <span className="status-pill">3 items need review</span>
            </div>
            <div className="issue-main">
              <div className="tag">Currency mismatch</div>
              <div className="rows">
                <div>
                  <div className="k">Prepared checklist</div>
                  <div className="v">USD 148,200</div>
                </div>
                <div>
                  <div className="k">Commercial invoice</div>
                  <div className="v">RMB 1,082,000</div>
                </div>
              </div>
              <div className="note">
                Currency and declared-value inputs do not align across the available records.
              </div>
              <div className="links">
                <a href="#">View source evidence</a>
                <a href="#">Ask Thavasi</a>
              </div>
            </div>
            {MINOR_ISSUES.map((issue) => (
              <div className="minor-row" key={issue}>
                <span>{issue}</span>
                <span>→</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
