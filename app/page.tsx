import Link from 'next/link'
import { CheckSquare } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <CheckSquare className="w-20 h-20 text-primary-600" />
        </div>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
          Welcome to Scheduled Dairy
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Your all-in-one productivity platform for task management, note-taking, and time tracking
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Link href="/tasks" className="group">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-slate-800">
              <div className="text-4xl mb-4">🗓️</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Daily Tasks
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create and manage your daily task schedules with time tracking
              </p>
            </div>
          </Link>

          <Link href="/history" className="group">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-slate-800">
              <div className="text-4xl mb-4">🕘</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                History
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View and restore your past task sheets and achievements
              </p>
            </div>
          </Link>

          <Link href="/materials" className="group">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-slate-800">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Materials
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload and organize your study materials and PDFs
              </p>
            </div>
          </Link>

          <Link href="/notes" className="group">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-slate-800">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Notes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create rich text notes with Notion-like features
              </p>
            </div>
          </Link>

          <Link href="/timer" className="group">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-slate-800">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Timer
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Focus with stopwatch and countdown timer tools
              </p>
            </div>
          </Link>

          <Link href="/profile" className="group">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-slate-800">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account and productivity statistics
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
