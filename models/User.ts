import mongoose, { Schema, models, Model } from 'mongoose'

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', userSchema)

export default User
