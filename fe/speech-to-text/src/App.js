import React, { useState, useEffect } from 'react'
import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = ('en-US','id-ID')

function App() {
  const [isListen, setIsListen] = useState(false)
  const [diagnoze, setDiagnoze] = useState(null)
  const [savedDiagnoze, setSavedDiagnoze] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListen])

  const handleListen = () => {
    if (isListen) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setDiagnoze(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveDiagnoze = () => {
    setSavedDiagnoze([...savedDiagnoze, diagnoze])
    setDiagnoze('')
  }

  return (
    <>
      <h1>Diagnoze</h1>
      <div className="container">
        <div className="box">
          <h2>Tell your condition</h2>
          {isListen ? <span>▶️</span> : <span>⏹️</span>}
          <button onClick={handleSaveDiagnoze} disabled={!diagnoze}>
            Save Diagnoze
          </button>
          <button onClick={() => setIsListen(prevState => !prevState)}>
            On/Off
          </button>
          <p>{diagnoze}</p>
        </div>
        <div className="box">
          <h2>Diagnoze</h2>
          {savedDiagnoze.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
