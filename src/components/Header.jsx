import brandIcon from '../assets/brand-icon.png'
import { useScrollHeader } from '../hooks/useScrollHeader'

export function Header({ onToggleTheme, onOpenEarlyAccess }) {
  const floating = useScrollHeader(60)

  return (
    <header id="siteHeader" className={floating ? 'floating' : undefined}>
      <div className="nav-inner">
        <div className="brand">
          <img src={brandIcon} alt="" className="brand-icon" />
          Thavasi
        </div>
        <nav className="navlinks">
          <a href="#platform">Platform</a>
          <a href="#verify">Verify</a>
          <a href="#ask">Ask Thavasi</a>
          <a href="#who">Who it&apos;s for</a>
        </nav>
        <div className="navright">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ padding: '10px 20px' }}
            onClick={onOpenEarlyAccess}
          >
            Request early access
          </button>
          <button type="button" className="menu-btn" aria-label="Menu">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
