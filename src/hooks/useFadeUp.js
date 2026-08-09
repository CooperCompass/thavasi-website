import { useEffect, useRef } from 'react'

export function useFadeUp() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in')
        })
      },
      { threshold: 0.15 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
