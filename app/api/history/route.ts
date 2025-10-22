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

    await dbConnect()

    // Get all unique dates with tasks
    const history = await Task.aggregate([
      { $match: { userId: session.user.id } },
      {
        $group: {
          _id: '$date',
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: ['$completed', 1, 0] },
          },
        },
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          date: '$_id',
          tasks: {
            total: '$total',
            completed: '$completed',
          },
        },
      },
    ])

    return NextResponse.json({ history })
  } catch (error) {
    console.error('Error fetching history:', error)
    return NextResponse.json(
      { message: 'Error fetching history' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
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

    await Task.deleteMany({
      userId: session.user.id,
      date: new Date(date),
    })

    return NextResponse.json({ message: 'History deleted successfully' })
  } catch (error) {
    console.error('Error deleting history:', error)
    return NextResponse.json(
      { message: 'Error deleting history' },
      { status: 500 }
    )
  }
}
