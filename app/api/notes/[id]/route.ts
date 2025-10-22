import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Note from '@/models/Note'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { title, content } = await req.json()

    await dbConnect()

    const note = await Note.findOne({
      _id: params.id,
      userId: session.user.id,
    })

    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 })
    }

    note.title = title || note.title
    note.content = content !== undefined ? content : note.content
    await note.save()

    return NextResponse.json({ note })
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json(
      { message: 'Error updating note' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const note = await Note.findOneAndDelete({
      _id: params.id,
      userId: session.user.id,
    })

    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Note deleted successfully' })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json(
      { message: 'Error deleting note' },
      { status: 500 }
    )
  }
}
