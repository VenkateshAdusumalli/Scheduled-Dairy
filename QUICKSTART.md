# 🚀 Quick Start Guide

Get your Scheduled Dairy app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB running (locally or Atlas)

## Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and update:
```env
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-generated-secret
```

Generate a secret:
```bash
openssl rand -base64 32
```

### 3. Create Uploads Directory
```bash
mkdir public\uploads
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Access the App
Open [http://localhost:3000](http://localhost:3000)

### 6. Create an Account
1. Click "Sign Up"
2. Enter your details
3. Sign in
4. Start being productive!

## MongoDB Setup Options

### Option 1: Local MongoDB
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
net start MongoDB  # Windows
brew services start mongodb-community  # Mac
sudo systemctl start mongod  # Linux

# Use this connection string:
MONGODB_URI=mongodb://localhost:27017/scheduled-dairy
```

### Option 2: MongoDB Atlas (Cloud - Free)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Add to `.env.local`

## Features to Try

✅ **Tasks**: Create your daily schedule with time-based tasks
✅ **History**: Review past days and restore old task lists
✅ **Materials**: Upload PDFs for your study materials
✅ **Notes**: Create rich text notes with formatting
✅ **Timer**: Use Pomodoro technique with countdown timer
✅ **Profile**: Track your productivity statistics

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.

## Build for Production

```bash
npm run build
npm start
```

---

Happy Scheduling! 📅✨
