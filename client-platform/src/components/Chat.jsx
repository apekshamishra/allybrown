import { useState, useEffect, useRef } from 'react'
import { questions } from '../data/questions.js'

// ─── Individual answer input types ─────────────────────────────────────────

function TextInput({ question, onAnswer }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    if (value.trim()) onAnswer(value.trim())
  }

  return (
    <div className="input-group">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        placeholder={question.placeholder}
        className="text-input"
      />
      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={!value.trim()}
      >
        Continue →
      </button>
    </div>
  )
}

function TextareaInput({ question, onAnswer }) {
  const [value, setValue] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  const handleSubmit = (skip = false) => {
    onAnswer(skip ? '' : value.trim())
  }

  return (
    <div className="input-group">
      <textarea
        ref={ref}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={question.placeholder}
        className="textarea-input"
        rows={4}
      />
      <div className="btn-row">
        {question.optional && (
          <button className="btn-secondary" onClick={() => handleSubmit(true)}>
            Skip
          </button>
        )}
        <button
          className="btn-primary"
          onClick={() => handleSubmit(false)}
          disabled={!value.trim() && !question.optional}
        >
          {value.trim() ? 'Continue →' : question.optional ? 'Continue →' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}

function SelectOne({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (option) => {
    setSelected(option)
    // Short delay so user sees selection before advancing
    setTimeout(() => onAnswer(option), 220)
  }

  return (
    <div className="options-grid">
      {question.options.map(option => (
        <button
          key={option}
          className={`option-btn ${selected === option ? 'selected' : ''}`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function SelectMany({ question, onAnswer }) {
  const [selected, setSelected] = useState([])

  const toggle = (option) => {
    setSelected(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    )
  }

  return (
    <div>
      <div className="options-grid">
        {question.options.map(option => (
          <button
            key={option}
            className={`option-btn ${selected.includes(option) ? 'selected' : ''}`}
            onClick={() => toggle(option)}
          >
            {selected.includes(option) && <span className="check">✓ </span>}
            {option}
          </button>
        ))}
      </div>
      <div className="btn-row" style={{ marginTop: '1.25rem' }}>
        <button
          className="btn-primary"
          onClick={() => onAnswer(selected)}
          disabled={selected.length === 0}
        >
          Continue with {selected.length} selected →
        </button>
      </div>
    </div>
  )
}

// ─── A single chat message bubble (previous Q&A) ───────────────────────────

function HistoryItem({ question, answer }) {
  const displayAnswer = Array.isArray(answer)
    ? answer.join(', ')
    : answer || '—'

  return (
    <div className="history-item">
      <div className="history-q">{question.question}</div>
      <div className="history-a">{displayAnswer || <em>Skipped</em>}</div>
    </div>
  )
}

// ─── Progress bar ──────────────────────────────────────────────────────────

function ProgressBar({ current, total, section }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span className="progress-section">{section}</span>
        <span className="progress-count">{current} of {total}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ─── Main chat component ───────────────────────────────────────────────────

export default function Chat({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [animating, setAnimating] = useState(false)
  const historyRef = useRef(null)

  const currentQuestion = questions[currentIndex]
  const answered = questions.slice(0, currentIndex)

  useEffect(() => {
    // Scroll history to bottom whenever a new answer is added
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [currentIndex])

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)
    setAnimating(true)

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(i => i + 1)
        setAnimating(false)
      } else {
        onComplete(newAnswers)
      }
    }, 280)
  }

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'text':
        return <TextInput question={currentQuestion} onAnswer={handleAnswer} />
      case 'textarea':
        return <TextareaInput question={currentQuestion} onAnswer={handleAnswer} />
      case 'select-one':
        return <SelectOne question={currentQuestion} onAnswer={handleAnswer} />
      case 'select-many':
        return <SelectMany question={currentQuestion} onAnswer={handleAnswer} />
      default:
        return null
    }
  }

  return (
    <div className="chat-layout">
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        section={currentQuestion.section}
      />

      {/* Answered questions scroll area */}
      {answered.length > 0 && (
        <div className="history-scroll" ref={historyRef}>
          {answered.map(q => (
            <HistoryItem key={q.id} question={q} answer={answers[q.id]} />
          ))}
        </div>
      )}

      {/* Active question card */}
      <div className={`question-card ${animating ? 'fade-out' : 'fade-in'}`}>
        <div className="question-section-tag">{currentQuestion.section}</div>
        <h2 className="question-text">{currentQuestion.question}</h2>
        {currentQuestion.subtext && (
          <p className="question-subtext">{currentQuestion.subtext}</p>
        )}
        <div className="question-input">{renderInput()}</div>
      </div>
    </div>
  )
}
