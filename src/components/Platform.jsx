import { FadeUp } from './ui'

export function Platform({ onOpenEarlyAccess }) {
  return (
    <section id="platform">
      <div className="wrap">
        <FadeUp className="section-head">
          <div className="eyebrow">THE PLATFORM</div>
          <h2>
            Start with a shipment.
            <br />
            Or start with a <em>question</em>.
          </h2>
          <p>
            Thavasi supports the work in two connected ways: verify what is prepared for
            filing, or investigate a trade-compliance question before a decision is made.
          </p>
        </FadeUp>
        <div className="two-cards">
          <FadeUp className="platform-card">
            <div>
              <div className="eyebrow">VERIFY</div>
              <h3>Review the filing before it is filed.</h3>
              <p>
                Cross-check a prepared checklist against source documents and surface what
                needs attention before the declaration moves forward.
              </p>
            </div>
            <button type="button" className="go" onClick={onOpenEarlyAccess}>
              Request early access →
            </button>
          </FadeUp>
          <FadeUp className="platform-card">
            <div>
              <div className="eyebrow">ASK THAVASI</div>
              <h3>Get trade intelligence on demand.</h3>
              <p>
                Ask focused questions on classification, duty, tariff treatment, notifications,
                exemptions, and documentation.
              </p>
            </div>
            <button type="button" className="go" onClick={onOpenEarlyAccess}>
              Request early access →
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
