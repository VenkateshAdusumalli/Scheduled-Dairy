import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Note from '@/models/Note'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const notes = await Note.find({ userId: session.user.id }).sort({
      updatedAt: -1,
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { message: 'Error fetching notes' },
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

    const { title, content } = await req.json()

    if (!title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 })
    }

    await dbConnect()

    const note = await Note.create({
      userId: session.user.id,
      title,
      content: content || '',
    })

    return NextResponse.json({ note }, { status: 201 })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { message: 'Error creating note' },
      { status: 500 }
    )
  }
}
