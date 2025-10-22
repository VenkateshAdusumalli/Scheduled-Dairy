'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Search, Calendar, Eye, Trash2, Copy, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

interface HistoryItem {
  _id: string
  date: string
  tasks: {
    total: number
    completed: number
  }
}

interface TaskDetail {
  _id: string
  title: string
  description?: string
  startTime: string
  endTime: string
  completed: boolean
}

export default function HistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHistory, setSelectedHistory] = useState<{
    date: string
    tasks: TaskDetail[]
  } | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchHistory()
    }
  }, [status])

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/history')
      if (response.ok) {
        const data = await response.json()
        setHistory(data.history || [])
      }
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHistoryDetails = async (date: string) => {
    try {
      const response = await fetch(`/api/tasks?date=${date}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedHistory({ date, tasks: data.tasks })
      }
    } catch (error) {
      console.error('Error fetching history details:', error)
    }
  }

  const restoreSheet = async (date: string) => {
    if (!confirm('This will copy all tasks from this day to today. Continue?')) return

    try {
      const response = await fetch('/api/history/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date }),
      })

      if (response.ok) {
        alert('Tasks restored successfully!')
        router.push('/tasks')
      }
    } catch (error) {
      console.error('Error restoring sheet:', error)
    }
  }

  const deleteHistory = async (date: string) => {
    if (!confirm('Are you sure you want to delete this history entry?')) return

    try {
      const response = await fetch(`/api/history?date=${date}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchHistory()
        setSelectedHistory(null)
      }
    } catch (error) {
      console.error('Error deleting history:', error)
    }
  }

  const filteredHistory = history.filter((item) =>
    format(new Date(item.date), 'MMMM d, yyyy').toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Task History</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* History List */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-4">Past Days</h2>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No history found. Start completing tasks to build your history!
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => fetchHistoryDetails(item.date)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary-600" />
                      <h3 className="font-semibold">
                        {format(new Date(item.date), 'MMMM d, yyyy')}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{item.tasks.total} tasks</span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {item.tasks.completed} completed
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        restoreSheet(item.date)
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      title="Restore to today"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteHistory(item.date)
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="Delete history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Task Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Task Details</h2>
          {selectedHistory ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4">
                {format(new Date(selectedHistory.date), 'MMMM d, yyyy')}
              </h3>
              <div className="space-y-3">
                {selectedHistory.tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`p-3 rounded-lg border-l-4 ${
                      task.completed
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                        : 'border-gray-300 bg-gray-50 dark:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        disabled
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            task.completed ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {task.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {task.startTime} - {task.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm text-center text-gray-500">
              Select a history entry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
