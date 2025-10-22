import mongoose, { Schema, models, Model } from 'mongoose'

export interface ITask {
  _id: string
  userId: string
  title: string
  description?: string
  startTime: string
  endTime: string
  completed: boolean
  date: Date
  order: number
  createdAt: Date
  updatedAt: Date
}

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
    },
    description: {
      type: String,
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

taskSchema.index({ userId: 1, date: 1 })

const Task: Model<ITask> = models.Task || mongoose.model<ITask>('Task', taskSchema)

export default Task
