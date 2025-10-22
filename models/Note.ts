import mongoose, { Schema, models, Model } from 'mongoose'

export interface INote {
  _id: string
  userId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const noteSchema = new Schema<INote>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Note title is required'],
    },
    content: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const Note: Model<INote> = models.Note || mongoose.model<INote>('Note', noteSchema)

export default Note
