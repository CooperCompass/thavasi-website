import { FadeUp } from './ui'

export function Problem() {
  return (
    <section className="tight">
      <div className="wrap">
        <FadeUp className="section-head">
          <div className="eyebrow">THE MOMENT BEFORE FILING</div>
          <h2>
            The filing may be digital.
            <br />
            The <em>checking</em> is still manual.
          </h2>
          <p>
            Before a Bill of Entry or Shipping Bill is filed, teams review information across
            the checklist, commercial invoice, packing list, transport documents, certificates,
            and applicable tariff or policy requirements. A mismatch in the data can lead to
            rework, delay, avoidable duty exposure, or compliance risk.
          </p>
        </FadeUp>
        <FadeUp className="flow-row">
          <span className="chip">Prepared checklist</span>
          <span className="arrow-sm">+</span>
          <span className="chip">Source documents</span>
          <span className="arrow-sm">→</span>
          <span className="node-thavasi">THAVASI</span>
          <span className="arrow-sm">→</span>
          <span className="chip">Clearer review before filing</span>
        </FadeUp>
      </div>
    </section>
  )
}
