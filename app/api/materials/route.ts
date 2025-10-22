import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Material from '@/models/Material'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const materials = await Material.find({ userId: session.user.id }).sort({
      createdAt: -1,
    })

    return NextResponse.json({ materials })
  } catch (error) {
    console.error('Error fetching materials:', error)
    return NextResponse.json(
      { message: 'Error fetching materials' },
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

    const formData = await req.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const subject = formData.get('subject') as string
    const description = formData.get('description') as string
    const semester = formData.get('semester') as string
    const category = formData.get('category') as string

    if (!file || !title || !subject) {
      return NextResponse.json(
        { message: 'File, title, and subject are required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { message: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB)
    if (file.size > 10485760) {
      return NextResponse.json(
        { message: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory already exists
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filePath = path.join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    await dbConnect()

    const material = await Material.create({
      userId: session.user.id,
      title,
      subject,
      description,
      semester,
      category,
      fileName: file.name,
      fileUrl: `/uploads/${fileName}`,
      fileSize: file.size,
    })

    return NextResponse.json({ material }, { status: 201 })
  } catch (error) {
    console.error('Error uploading material:', error)
    return NextResponse.json(
      { message: 'Error uploading material' },
      { status: 500 }
    )
  }
}
