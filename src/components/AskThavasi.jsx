import { FadeUp } from './ui'

const PROMPTS = [
  'What should I verify for this ITC(HS) code?',
  'Why is the calculated duty different from the checklist?',
  'Could an exemption notification apply here?',
  'What certificates or import conditions should be checked?',
]

const ACTIVE_PROMPT = 'Could an exemption notification apply here?'

const ANSWER_ROWS = [
  {
    k: 'What to review',
    v: 'Eligibility conditions under the applicable notification for this classification.',
  },
  {
    k: 'Assumptions used',
    v: 'Country of origin and product description as stated in current documents.',
  },
  {
    k: 'Tariff / duty elements to check',
    v: 'Base rate vs. notified concessional rate, and applicable conditions.',
  },
  {
    k: 'Documentation to confirm',
    v: 'Certificate of origin and any prescribed end-use declaration.',
  },
]

export function AskThavasi() {
  return (
    <section id="ask">
      <div className="wrap split reverse">
        <FadeUp className="split-copy">
          <div className="eyebrow">ASK THAVASI</div>
          <h2>Ask the question behind the decision.</h2>
          <p className="lead">
            When a document raises a question — or when a team needs to check something before
            preparing the checklist — Ask Thavasi turns a trade query into a structured
            compliance review.
          </p>
        </FadeUp>
        <FadeUp className="split-panel">
          <div className="qa-panel">
            <div className="prompts">
              {PROMPTS.map((prompt) => (
                <div
                  key={prompt}
                  className={`prompt-chip${prompt === ACTIVE_PROMPT ? ' active' : ''}`}
                >
                  {prompt}
                </div>
              ))}
            </div>
            <div className="answer-card">
              <div className="tag">Potentially relevant for review</div>
              {ANSWER_ROWS.map((row) => (
                <div className="answer-row" key={row.k}>
                  <div className="k">{row.k}</div>
                  <div className="v">{row.v}</div>
                </div>
              ))}
              <div className="disclaimer">
                Guidance supports professional review. Final filing and legal decisions remain
                with the authorised user.
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
