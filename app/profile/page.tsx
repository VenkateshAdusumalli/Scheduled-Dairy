'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User, Mail, Calendar, Award, Target, Clock } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    totalNotes: 0,
    totalMaterials: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchStats()
    }
  }, [status])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/profile/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{stats.totalTasks}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">{stats.completedTasks}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{stats.totalNotes}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notes</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold">{stats.totalMaterials}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Materials</p>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Task Completion Rate</h3>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="text-2xl font-bold text-primary-600">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4">
            <div
              className="bg-primary-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          You&apos;ve completed {stats.completedTasks} out of {stats.totalTasks} tasks. Keep up the great work!
        </p>
      </div>
    </div>
  )
}
