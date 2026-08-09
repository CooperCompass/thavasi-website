import { ArrowIcon } from './ui'
import { HeroScenes } from './HeroScenes'

export function Hero({ onOpenEarlyAccess }) {
  return (
    <section className="hero">
      <HeroScenes />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="eyebrow">THAVASI · BY COOPER COMPASS</div>
        <h1>
          Trade compliance,
          <br />
          checked before it <em>costs you</em>.
        </h1>
        <p className="sub">
          Thavasi is an AI Trade Compliance Platform for Customs Brokers, importers, and
          exporters — bringing classification, tariff, duty, documentation, and compliance
          intelligence into one place before filing.
        </p>
        <p className="hero-tagline">For the people who move the world&apos;s trade.</p>
        <div className="hero-ctas">
          <button type="button" className="btn btn-primary" onClick={onOpenEarlyAccess}>
            Request early access <ArrowIcon />
          </button>
          <a href="#platform" className="btn btn-ghost">
            Explore the platform ↓
          </a>
        </div>
        <div className="credibility">
          Supported by the Desai Sethi School of Entrepreneurship (DSSE), IIT Bombay.
        </div>
      </div>
    </section>
  )
}
