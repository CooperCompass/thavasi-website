import { FadeUp } from './ui'

const POINTS = [
  {
    title: 'No forced replacement',
    body: 'Keep your existing filing software and operational process.',
    icon: (
      <svg
        className="wf-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5M14 3v4h4M10 21v-4H6" />
      </svg>
    ),
  },
  {
    title: 'No blind automation',
    body: 'Thavasi highlights, explains, and supports review. Your authorised team remains in control.',
    icon: (
      <svg
        className="wf-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: 'No black-box decisions',
    body: 'Work from source documents, stated assumptions, and clear reasoning.',
    icon: (
      <svg
        className="wf-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </svg>
    ),
  },
]

const FLOW = [
  'Existing checklist preparation',
  'Thavasi review',
  'Existing filing software',
  'Customs filing',
]

export function Workflow() {
  return (
    <section>
      <div className="wrap">
        <FadeUp className="section-head">
          <div className="eyebrow">BUILT AROUND YOUR WORKFLOW</div>
          <h2>
            Intelligence before filing.
            <br />
            Not another filing system.
          </h2>
          <p>
            Thavasi is designed to work alongside the systems and processes your team already
            uses. It helps validate the information, research the rule, and document the
            reasoning before the filing is submitted through your established workflow.
          </p>
        </FadeUp>
        <FadeUp className="wf-points">
          {POINTS.map((point) => (
            <div className="wf-point" key={point.title}>
              {point.icon}
              <div className="t">{point.title}</div>
              <div className="d">{point.body}</div>
            </div>
          ))}
        </FadeUp>
        <FadeUp className="wf-line">
          {FLOW.flatMap((node, i) =>
            i < FLOW.length - 1
              ? [
                  <span className="node" key={node}>
                    {node}
                  </span>,
                  <span className="arrow-sm" key={`${node}-arrow`}>
                    →
                  </span>,
                ]
              : [
                  <span className="node" key={node}>
                    {node}
                  </span>,
                ],
          )}
        </FadeUp>
      </div>
    </section>
  )
}
