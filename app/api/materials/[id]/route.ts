import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Material from '@/models/Material'
import { unlink } from 'fs/promises'
import path from 'path'

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

    const material = await Material.findOne({
      _id: params.id,
      userId: session.user.id,
    })

    if (!material) {
      return NextResponse.json({ message: 'Material not found' }, { status: 404 })
    }

    // Delete file from filesystem
    try {
      const filePath = path.join(process.cwd(), 'public', material.fileUrl)
      await unlink(filePath)
    } catch (error) {
      console.error('Error deleting file:', error)
    }

    // Delete from database
    await Material.findByIdAndDelete(params.id)

    return NextResponse.json({ message: 'Material deleted successfully' })
  } catch (error) {
    console.error('Error deleting material:', error)
    return NextResponse.json(
      { message: 'Error deleting material' },
      { status: 500 }
    )
  }
}
