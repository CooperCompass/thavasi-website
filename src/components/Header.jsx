import { useEffect, useState } from 'react'
import brandIcon from '../assets/brand-icon.png'
import { useScrollHeader } from '../hooks/useScrollHeader'

const NAV_LINKS = [
  { href: '#platform', label: 'Platform' },
  { href: '#verify', label: 'Verify' },
  { href: '#ask', label: 'Ask Thavasi' },
  { href: '#who', label: "Who it's for" },
]

export function Header({ onToggleTheme, onOpenEarlyAccess }) {
  const floating = useScrollHeader(60)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 861px)').matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleEarlyAccess = (e) => {
    closeMenu()
    onOpenEarlyAccess?.(e)
  }

  return (
    <header
      id="siteHeader"
      className={[floating ? 'floating' : '', menuOpen ? 'menu-open' : ''].filter(Boolean).join(' ') || undefined}
    >
      <div className="nav-inner">
        <a href="#top" className="brand" onClick={closeMenu}>
          <img src={brandIcon} alt="" className="brand-icon" />
          Thavasi
        </a>
        <nav className="navlinks" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
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
            className="btn btn-primary nav-cta"
            style={{ padding: '10px 20px' }}
            onClick={handleEarlyAccess}
          >
            Request early access
          </button>
          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav-links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" className="btn btn-primary mobile-nav-cta" onClick={handleEarlyAccess}>
          Request early access
        </button>
      </div>
      {menuOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </header>
  )
}
