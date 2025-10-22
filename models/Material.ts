import mongoose, { Schema, models, Model } from 'mongoose'

export interface IMaterial {
  _id: string
  userId: string
  title: string
  subject: string
  description?: string
  fileName: string
  fileUrl: string
  fileSize: number
  semester?: string
  category?: string
  createdAt: Date
  updatedAt: Date
}

const materialSchema = new Schema<IMaterial>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    description: {
      type: String,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    semester: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

materialSchema.index({ userId: 1, subject: 1 })

const Material: Model<IMaterial> = models.Material || mongoose.model<IMaterial>('Material', materialSchema)

export default Material
