import { questions, SECTIONS } from '../data/questions.js'

// Groups questions by their section label
function groupBySection(answers) {
  return SECTIONS.map(section => ({
    section,
    items: questions
      .filter(q => q.section === section)
      .map(q => ({
        label: q.question,
        value: answers[q.id],
        optional: q.optional,
      }))
      .filter(item => item.value !== undefined),
  })).filter(group => group.items.length > 0)
}

function formatValue(value) {
  if (!value && value !== 0) return <span className="summary-empty">Not provided</span>
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="summary-empty">None selected</span>
    return (
      <div className="summary-tags">
        {value.map(v => <span key={v} className="tag">{v}</span>)}
      </div>
    )
  }
  return <span className="summary-value">{value}</span>
}

// Derives headline stats from answers
function Headline({ answers }) {
  const clientName = answers.clientName || 'This client'
  const vol = answers.assetVolume || '—'
  const langs = Array.isArray(answers.languages) ? answers.languages.length : 0
  const platforms = Array.isArray(answers.platforms) ? answers.platforms.length : 0
  const formats = answers.formatVariations || '—'

  return (
    <div className="summary-headline">
      <div className="headline-stat">
        <span className="headline-num">{vol}</span>
        <span className="headline-label">assets / month</span>
      </div>
      <div className="headline-divider" />
      <div className="headline-stat">
        <span className="headline-num">{langs}</span>
        <span className="headline-label">language{langs !== 1 ? 's' : ''}</span>
      </div>
      <div className="headline-divider" />
      <div className="headline-stat">
        <span className="headline-num">{platforms}</span>
        <span className="headline-label">platform{platforms !== 1 ? 's' : ''}</span>
      </div>
      <div className="headline-divider" />
      <div className="headline-stat">
        <span className="headline-num">{formats.split(' ')[0]}</span>
        <span className="headline-label">format variations</span>
      </div>
    </div>
  )
}

export default function Summary({ answers, onRestart }) {
  const clientName = answers.clientName || 'Client'
  const sections = groupBySection(answers)
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="summary-page">
      {/* Header */}
      <div className="summary-header">
        <div className="summary-header-inner">
          <div className="summary-badge">Phase 1 Complete</div>
          <h1 className="summary-title">{clientName}</h1>
          <p className="summary-subtitle">
            Client setup captured on {date}
          </p>
          <Headline answers={answers} />
        </div>
      </div>

      {/* Body */}
      <div className="summary-body">
        <div className="summary-grid">
          {sections.map(({ section, items }) => (
            <div key={section} className="summary-section">
              <h3 className="summary-section-title">{section}</h3>
              <div className="summary-items">
                {items.map(({ label, value, optional }) => (
                  <div key={label} className="summary-row">
                    <div className="summary-label">{label}</div>
                    <div className="summary-answer">{formatValue(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Next steps panel */}
        <div className="next-steps">
          <h3 className="next-steps-title">What happens next</h3>
          <p className="next-steps-text">
            This setup feeds directly into Phase 2, where the platform generates
            a connected ops model and tech configuration specific to {clientName}.
            Every workflow stage, team role, approval gate, QC rule, and delivery
            connection will be derived from what you've told us here.
          </p>
          <div className="next-steps-phases">
            <div className="phase-pill active">
              <span className="phase-dot done" />
              Phase 1 — Client Setup ✓
            </div>
            <div className="phase-pill upcoming">
              <span className="phase-dot" />
              Phase 2 — Generate the Connected Model
            </div>
            <div className="phase-pill upcoming">
              <span className="phase-dot" />
              Phase 3 — The Client Runs Their Work Through It
            </div>
          </div>
          <div className="summary-actions">
            <button className="btn-primary" disabled title="Coming in Phase 2">
              Generate Ops Model →
            </button>
            <button className="btn-ghost" onClick={onRestart}>
              Start a new client
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
