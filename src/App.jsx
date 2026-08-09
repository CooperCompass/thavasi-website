import { useCallback, useState } from 'react'
import { AskThavasi } from './components/AskThavasi'
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

export default function App() {
  const { toggleTheme } = useTheme()
  const [modalOpen, setModalOpen] = useState(false)

  const openEarlyAccess = useCallback((e) => {
    e?.preventDefault?.()
    setModalOpen(true)
  }, [])

  const closeEarlyAccess = useCallback(() => setModalOpen(false), [])

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
