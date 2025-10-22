import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Task from '@/models/Task'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { date } = await req.json()

    if (!date) {
      return NextResponse.json({ message: 'Date is required' }, { status: 400 })
    }

    await dbConnect()

    // Get tasks from the specified date
    const oldTasks = await Task.find({
      userId: session.user.id,
      date: new Date(date),
    })

    if (oldTasks.length === 0) {
      return NextResponse.json(
        { message: 'No tasks found for this date' },
        { status: 404 }
      )
    }

    // Create new tasks for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const newTasks = oldTasks.map((task) => ({
      userId: session.user.id,
      title: task.title,
      description: task.description,
      startTime: task.startTime,
      endTime: task.endTime,
      date: today,
      completed: false,
      order: task.order,
    }))

    await Task.insertMany(newTasks)

    return NextResponse.json(
      { message: 'Tasks restored successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error restoring tasks:', error)
    return NextResponse.json(
      { message: 'Error restoring tasks' },
      { status: 500 }
    )
  }
}
