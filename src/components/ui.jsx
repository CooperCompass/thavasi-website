import { useFadeUp } from '../hooks/useFadeUp'

export function FadeUp({ children, className = '', as: Tag = 'div', ...props }) {
  const ref = useFadeUp()
  return (
    <Tag ref={ref} className={`fade-up ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
