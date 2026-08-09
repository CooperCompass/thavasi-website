import { useCallback, useEffect, useState } from 'react'
import { AskThavasi } from './components/AskThavasi'
import { AdminLogin, AdminPanel, clearAdminToken, getAdminToken } from './components/Admin'
import { Audience } from './components/Audience'
import { Capabilities } from './components/Capabilities'
import { EarlyAccess } from './components/EarlyAccess'
import { EarlyAccessModal } from './components/EarlyAccessModal'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Platform } from './components/Platform'
import { Problem } from './components/Problem'
import { Verify } from './components/Verify'
import { Workflow } from './components/Workflow'
import { useTheme } from './hooks/useTheme'

function isAdminPath() {
  return window.location.pathname.replace(/\/+$/, '') === '/admin'
}

export default function App() {
  const { toggleTheme } = useTheme()
  const [modalOpen, setModalOpen] = useState(false)
  const [onAdminRoute, setOnAdminRoute] = useState(isAdminPath)
  const [adminAuthed, setAdminAuthed] = useState(() => Boolean(getAdminToken()) && isAdminPath())

  useEffect(() => {
    const sync = () => {
      const admin = isAdminPath()
      setOnAdminRoute(admin)
      if (admin && getAdminToken()) setAdminAuthed(true)
      if (!admin) setAdminAuthed(false)
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const openEarlyAccess = useCallback((e) => {
    e?.preventDefault?.()
    setModalOpen(true)
  }, [])

  const closeEarlyAccess = useCallback(() => setModalOpen(false), [])

  const leaveAdmin = useCallback(() => {
    clearAdminToken()
    setAdminAuthed(false)
    window.history.pushState({}, '', '/')
    setOnAdminRoute(false)
  }, [])

  if (onAdminRoute && adminAuthed) {
    return (
      <>
        <Header onToggleTheme={toggleTheme} onOpenEarlyAccess={openEarlyAccess} />
        <AdminPanel onLogout={leaveAdmin} />
      </>
    )
  }

  if (onAdminRoute) {
    return (
      <>
        <Header onToggleTheme={toggleTheme} onOpenEarlyAccess={openEarlyAccess} />
        <AdminLogin
          open
          onClose={() => {
            window.history.pushState({}, '', '/')
            setOnAdminRoute(false)
          }}
          onSuccess={() => setAdminAuthed(true)}
        />
      </>
    )
  }

  return (
    <>
      <Header onToggleTheme={toggleTheme} onOpenEarlyAccess={openEarlyAccess} />
      <main>
        <Hero onOpenEarlyAccess={openEarlyAccess} />
        <Problem />
        <Platform onOpenEarlyAccess={openEarlyAccess} />
        <Verify />
        <AskThavasi />
        <Capabilities />
        <Workflow />
        <Audience />
        <EarlyAccess onOpenEarlyAccess={openEarlyAccess} />
      </main>
      <Footer />
      <EarlyAccessModal open={modalOpen} onClose={closeEarlyAccess} />
    </>
  )
}
