'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Timer as TimerIcon, Clock } from 'lucide-react'

export default function TimerPage() {
  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0)
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false)
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Countdown state
  const [countdownTime, setCountdownTime] = useState(0)
  const [countdownInputMinutes, setCountdownInputMinutes] = useState(25)
  const [isCountdownRunning, setIsCountdownRunning] = useState(false)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Motivational quotes
  const quotes = [
    "The secret of getting ahead is getting started.",
    "Focus on being productive instead of busy.",
    "Don't watch the clock; do what it does. Keep going.",
    "Success is the sum of small efforts repeated day in and day out.",
    "You don't have to be great to start, but you have to start to be great.",
  ]
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  useEffect(() => {
    // Change quote every 30 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 30000)

    return () => clearInterval(quoteInterval)
  }, [])

  // Stopwatch functions
  const startStopwatch = () => {
    setIsStopwatchRunning(true)
    stopwatchIntervalRef.current = setInterval(() => {
      setStopwatchTime((prev) => prev + 10)
    }, 10)
  }

  const pauseStopwatch = () => {
    setIsStopwatchRunning(false)
    if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current)
    }
  }

  const resetStopwatch = () => {
    setIsStopwatchRunning(false)
    setStopwatchTime(0)
    if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current)
    }
  }

  // Countdown functions
  const startCountdown = () => {
    if (countdownTime === 0) {
      setCountdownTime(countdownInputMinutes * 60 * 1000)
    }
    setIsCountdownRunning(true)
    countdownIntervalRef.current = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 10) {
          pauseCountdown()
          playAlert()
          showNotification()
          return 0
        }
        return prev - 10
      })
    }, 10)
  }

  const pauseCountdown = () => {
    setIsCountdownRunning(false)
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }
  }

  const resetCountdown = () => {
    setIsCountdownRunning(false)
    setCountdownTime(0)
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }
  }

  const playAlert = () => {
    // Create audio context for alert sound
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const showNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: 'Your countdown timer has finished.',
        icon: '/favicon.ico',
      })
    }
  }

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Format time display
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(2, '0'),
    }
  }

  const stopwatchDisplay = formatTime(stopwatchTime)
  const countdownDisplay = formatTime(countdownTime)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current)
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Focus Timer</h1>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-lg p-6 mb-8 text-center">
        <p className="text-lg italic">&quot;{currentQuote}&quot;</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Stopwatch */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold">Stopwatch</h2>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold mb-2">
              {stopwatchDisplay.hours}:{stopwatchDisplay.minutes}:{stopwatchDisplay.seconds}
            </div>
            <div className="text-3xl font-mono text-gray-500">
              .{stopwatchDisplay.milliseconds}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {!isStopwatchRunning ? (
              <button
                onClick={startStopwatch}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start
              </button>
            ) : (
              <button
                onClick={pauseStopwatch}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
            )}
            <button
              onClick={resetStopwatch}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TimerIcon className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold">Countdown Timer</h2>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold mb-2">
              {countdownDisplay.hours}:{countdownDisplay.minutes}:{countdownDisplay.seconds}
            </div>
            <div className="text-3xl font-mono text-gray-500">
              .{countdownDisplay.milliseconds}
            </div>
          </div>

          {!isCountdownRunning && countdownTime === 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-center">
                Set Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="999"
                value={countdownInputMinutes}
                onChange={(e) => setCountdownInputMinutes(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg text-center text-2xl dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
          )}

          <div className="flex justify-center gap-4">
            {!isCountdownRunning ? (
              <button
                onClick={startCountdown}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start
              </button>
            ) : (
              <button
                onClick={pauseCountdown}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
            )}
            <button
              onClick={resetCountdown}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          {/* Quick Timer Presets */}
          {!isCountdownRunning && countdownTime === 0 && (
            <div className="mt-6 pt-6 border-t dark:border-slate-700">
              <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-3">
                Quick Presets
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCountdownInputMinutes(5)}
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  5 min
                </button>
                <button
                  onClick={() => setCountdownInputMinutes(15)}
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  15 min
                </button>
                <button
                  onClick={() => setCountdownInputMinutes(25)}
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  25 min
                </button>
                <button
                  onClick={() => setCountdownInputMinutes(30)}
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  30 min
                </button>
                <button
                  onClick={() => setCountdownInputMinutes(45)}
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  45 min
                </button>
                <button
                  onClick={() => setCountdownInputMinutes(60)}
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  60 min
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
          💡 Productivity Tips
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• Use the Pomodoro Technique: Work for 25 minutes, then take a 5-minute break</li>
          <li>• The stopwatch is perfect for tracking how long tasks actually take</li>
          <li>• Enable browser notifications to get alerts when your countdown finishes</li>
          <li>• Minimize distractions during focused work sessions for better results</li>
        </ul>
      </div>
    </div>
  )
}
