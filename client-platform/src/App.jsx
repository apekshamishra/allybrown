import { useState } from 'react'
import Chat from './components/Chat.jsx'
import Summary from './components/Summary.jsx'

export default function App() {
  const [phase, setPhase] = useState('intro') // 'intro' | 'chat' | 'summary'
  const [answers, setAnswers] = useState({})

  const handleComplete = (collectedAnswers) => {
    setAnswers(collectedAnswers)
    setPhase('summary')
  }

  const handleRestart = () => {
    setAnswers({})
    setPhase('intro')
  }

  if (phase === 'summary') {
    return <Summary answers={answers} onRestart={handleRestart} />
  }

  if (phase === 'chat') {
    return (
      <div className="app-shell">
        <header className="top-bar">
          <div className="top-bar-inner">
            <div className="logo">
              <span className="logo-mark">▲</span>
              <span className="logo-text">Client Platform</span>
            </div>
            <div className="top-bar-label">Phase 1 — Client Setup</div>
          </div>
        </header>
        <main className="main-content">
          <Chat onComplete={handleComplete} />
        </main>
      </div>
    )
  }

  // Intro / landing screen
  return (
    <div className="intro-page">
      <div className="intro-content">
        <div className="intro-badge">Production Operations Platform</div>
        <h1 className="intro-title">
          Build a client platform<br />
          <span className="intro-title-accent">in minutes, not months.</span>
        </h1>
        <p className="intro-body">
          Answer a few questions about your client — who they are, what they're
          producing, how much, and for which platforms — and we'll build their
          dedicated ops model and tech configuration automatically.
        </p>

        <div className="intro-phases">
          <div className="intro-phase active-phase">
            <span className="phase-num">01</span>
            <div>
              <div className="phase-name">Client Setup</div>
              <div className="phase-desc">Capture the client brief conversationally</div>
            </div>
          </div>
          <div className="intro-phase">
            <span className="phase-num muted">02</span>
            <div>
              <div className="phase-name muted">Generate the Model</div>
              <div className="phase-desc muted">Ops workflow + tech configuration, auto-built</div>
            </div>
          </div>
          <div className="intro-phase">
            <span className="phase-num muted">03</span>
            <div>
              <div className="phase-name muted">Run Work Through It</div>
              <div className="phase-desc muted">Assets in → QC'd and delivered automatically</div>
            </div>
          </div>
        </div>

        <button className="btn-start" onClick={() => setPhase('chat')}>
          Set up a new client →
        </button>
      </div>
    </div>
  )
}
