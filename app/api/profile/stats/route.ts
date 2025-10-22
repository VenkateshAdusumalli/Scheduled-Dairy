import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Task from '@/models/Task'
import Note from '@/models/Note'
import Material from '@/models/Material'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const [totalTasks, completedTasks, totalNotes, totalMaterials] = await Promise.all([
      Task.countDocuments({ userId: session.user.id }),
      Task.countDocuments({ userId: session.user.id, completed: true }),
      Note.countDocuments({ userId: session.user.id }),
      Material.countDocuments({ userId: session.user.id }),
    ])

    return NextResponse.json({
      totalTasks,
      completedTasks,
      totalNotes,
      totalMaterials,
    })
  } catch (error) {
    console.error('Error fetching profile stats:', error)
    return NextResponse.json(
      { message: 'Error fetching profile stats' },
      { status: 500 }
    )
  }
}
