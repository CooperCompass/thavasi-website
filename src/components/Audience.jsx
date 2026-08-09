import { FadeUp } from './ui'

export function Audience() {
  return (
    <section id="who" className="tight">
      <div className="wrap">
        <FadeUp className="section-head">
          <div className="eyebrow">WHO IT IS FOR</div>
          <h2>Built for every team responsible for getting trade right.</h2>
          <p>
            Whether you prepare the declaration or are responsible for the goods, cost, and
            compliance behind it, Thavasi helps verify the decisions that matter before filing.
          </p>
        </FadeUp>
        <FadeUp className="audience-grid">
          <div className="aud-card">
            <div className="eyebrow">
              CUSTOMS BROKERS / CHA
              <span style={{ textTransform: 'lowercase' }}>s</span>
            </div>
            <h3>Protect every filing before it moves forward.</h3>
            <p>
              Cross-check prepared checklists against source documents and review HSN/ITC(HS),
              valuation, currency, tariff treatment, duty calculations, exemptions, and
              compliance requirements — before an error creates rework, delay, duty exposure, or
              client risk.
            </p>
          </div>
          <div className="aud-card">
            <div className="eyebrow">IMPORTERS &amp; EXPORTERS</div>
            <h3>Protect every filing before goods move.</h3>
            <p>
              Cross-check trade data, documents, classification, tariff treatment, duty
              calculations, exemptions, and policy conditions — before an error creates avoidable
              cost, rework, clearance delay, or compliance exposure.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
