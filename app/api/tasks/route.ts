import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Task from '@/models/Task'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ message: 'Date is required' }, { status: 400 })
    }

    await dbConnect()

    const tasks = await Task.find({
      userId: session.user.id,
      date: new Date(date),
    }).sort({ order: 1, startTime: 1 })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { message: 'Error fetching tasks' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, startTime, endTime, date } = body

    if (!title || !startTime || !endTime || !date) {
      return NextResponse.json(
        { message: 'Required fields missing' },
        { status: 400 }
      )
    }

    await dbConnect()

    const task = await Task.create({
      userId: session.user.id,
      title,
      description,
      startTime,
      endTime,
      date: new Date(date),
      completed: false,
      order: 0,
    })

    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { message: 'Error creating task' },
      { status: 500 }
    )
  }
}
