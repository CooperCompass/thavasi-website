import { FadeUp } from './ui'

const CAPABILITIES = [
  {
    idx: '01',
    title: 'Classification review',
    body: 'Bring structure to HSN/ITC(HS) classification questions and flag inputs that need review.',
  },
  {
    idx: '02',
    title: 'Tariff and duty review',
    body: 'Check duty components, calculation inputs, valuation details, and tariff treatment.',
  },
  {
    idx: '03',
    title: 'Notifications and exemptions',
    body: 'Surface potentially relevant notifications, exemptions, and conditions for review.',
  },
  {
    idx: '04',
    title: 'Compliance readiness',
    body: 'Identify documentation, certification, and import/export-condition questions before filing.',
  },
  {
    idx: '05',
    title: 'Document consistency',
    body: 'Compare details across the prepared checklist and source documents to find mismatches.',
  },
  {
    idx: '06',
    title: 'Regulatory intelligence',
    body: 'Stay aware of relevant tariff, policy, and regulatory changes.',
  },
]

export function Capabilities() {
  return (
    <section className="tight">
      <div className="wrap">
        <FadeUp className="section-head">
          <div className="eyebrow">TRADE INTELLIGENCE</div>
          <h2>The decisions behind every filing.</h2>
          <p>
            Trade compliance is not one field in a checklist. Thavasi brings the classification,
            tariff, documentation, and policy questions around a transaction into a clearer
            review.
          </p>
        </FadeUp>
        <FadeUp className="cap-grid">
          {CAPABILITIES.map((cap) => (
            <div className="cap-card" key={cap.idx}>
              <div className="idx">{cap.idx}</div>
              <h3>{cap.title}</h3>
              <p>{cap.body}</p>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}
