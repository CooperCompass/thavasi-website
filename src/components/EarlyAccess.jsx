import { ArrowIcon, FadeUp } from './ui'

export function EarlyAccess({ onOpenEarlyAccess }) {
  return (
    <section className="ea-section" id="early-access">
      <div className="wrap">
        <FadeUp className="ea-head">
          <div className="eyebrow">EARLY ACCESS</div>
          <h2>Help build the trade compliance layer your team actually needs.</h2>
          <p>
            Built with input from Customs Brokers, importers, and exporters who deal with this
            every day.
          </p>
        </FadeUp>
        <FadeUp style={{ marginTop: 40 }}>
          <button type="button" className="btn btn-primary" onClick={onOpenEarlyAccess}>
            Request early access <ArrowIcon />
          </button>
        </FadeUp>
      </div>
    </section>
  )
}
