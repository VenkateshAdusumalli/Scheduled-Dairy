# 📅 Scheduled Dairy

A comprehensive full-stack task management and productivity application built with Next.js 14, TypeScript, MongoDB, and NextAuth.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🚀 Quick Deploy

**Ready to deploy?** This application is optimized for deployment on [Vercel](https://vercel.com) (free tier available).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VenkateshAdusumalli/Scheduled-Dairy)

📖 **[Read the full deployment guide →](DEPLOYMENT.md)**

> **Note**: This app requires a server and database, so it **cannot** be deployed to GitHub Pages. Use Vercel, Netlify, or similar platforms. See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

## ✨ Features

### 🗓️ Daily Task Scheduler
- Create and manage daily task sheets with time-based scheduling
- Add task title, description, start time, and end time
- Mark tasks as complete with checkboxes
- Visual progress bar showing completion percentage
- Drag and reorder tasks
- Full CRUD operations (Create, Read, Update, Delete)
- Tasks automatically sorted by time

### 🕘 History Page
- Automatically saves all completed task sheets
- View past days with task completion statistics
- Search and filter by date
- Restore previous day's tasks to today
- Delete old history entries
- Detailed view of tasks from any past day

### 📚 Materials/Blog Page
- Upload and manage PDF study materials (max 10MB)
- Categorize by subject, semester, and custom categories
- Add titles and descriptions to materials
- Search and filter by subject
- Download or preview PDFs
- File size tracking

### 📝 Notes Page (Notion-like)
- Rich text editor with formatting options
- Bold, italic, strikethrough text
- Headings (H1, H2)
- Bullet lists and numbered lists
- Code blocks
- Auto-save functionality
- Create multiple notes with titles
- Real-time editing

### ⏱️ Timer Page
- **Stopwatch**: Track time with millisecond precision
- **Countdown Timer**: Set custom durations with alerts
- Quick timer presets (5, 15, 25, 30, 45, 60 minutes)
- Browser notifications when timer completes
- Audio alert on completion
- Motivational quotes for productivity
- Perfect for Pomodoro Technique

### 👤 Profile & Statistics
- User profile with account information
- Task completion statistics
- Overall completion rate visualization
- Track total tasks, notes, and materials

### 🔐 Authentication
- Secure user authentication with NextAuth
- Email and password login
- Protected routes
- Session management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with credentials provider
- **Rich Text Editor**: Tiptap
- **File Upload**: React Dropzone
- **Date Handling**: date-fns
- **Form Handling**: React Hooks

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Scheduled Dairy"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/scheduled-dairy
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scheduled-dairy

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# App Configuration
NODE_ENV=development
```

To generate a secure `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

4. **Set up MongoDB**

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service:
  ```bash
  # Windows
  net start MongoDB
  
  # macOS/Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string and add it to `.env.local`

5. **Create uploads directory**
```bash
mkdir public\uploads
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
Scheduled Dairy/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── tasks/                # Task CRUD operations
│   │   ├── history/              # History management
│   │   ├── materials/            # PDF upload/management
│   │   ├── notes/                # Notes CRUD
│   │   └── profile/              # User statistics
│   ├── auth/                     # Auth pages (signin/signup)
│   ├── tasks/                    # Daily task scheduler
│   ├── history/                  # Task history page
│   ├── materials/                # Materials/PDF page
│   ├── notes/                    # Rich text notes page
│   ├── timer/                    # Stopwatch/countdown page
│   ├── profile/                  # User profile page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── layout/                   # Layout components
│   │   └── Navbar.tsx           # Navigation bar
│   └── providers/               # Context providers
│       └── AuthProvider.tsx     # Auth session provider
├── lib/                          # Utility functions
│   ├── mongodb.ts               # MongoDB connection
│   └── auth.ts                  # NextAuth configuration
├── models/                       # MongoDB/Mongoose models
│   ├── User.ts                  # User model
│   ├── Task.ts                  # Task model
│   ├── Material.ts              # Material model
│   └── Note.ts                  # Note model
├── types/                        # TypeScript type definitions
│   └── next-auth.d.ts           # NextAuth type extensions
├── public/                       # Static files
│   └── uploads/                 # PDF upload directory
├── .env.local                   # Environment variables (create this)
├── .env.example                 # Environment template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind CSS config
└── README.md                    # This file
```

## 🔑 Default User Setup

The application requires user registration. To get started:

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click "Sign Up" in the navigation
3. Create an account with:
   - Full Name
   - Email address
   - Password (minimum 6 characters)
4. Sign in with your credentials

## 📱 Features Guide

### Daily Tasks
1. Select a date using the date picker
2. Click "Add Task" to create a new task
3. Fill in task details (title, description, start/end times)
4. Mark tasks as complete by checking the checkbox
5. Edit or delete tasks using the action buttons
6. View your progress in the progress bar

### History
1. View all past days with tasks
2. Click on a date to see task details
3. Use the restore button to copy tasks to today
4. Search for specific dates
5. Delete old history entries if needed

### Materials
1. Click "Upload Material" button
2. Drag and drop or select a PDF file (max 10MB)
3. Fill in material details (title, subject, etc.)
4. Use search and filter to find materials
5. Download or delete materials as needed

### Notes
1. Click "+" to create a new note
2. Enter a title for your note
3. Use the toolbar for text formatting
4. Click "Save Note" to save your changes
5. Switch between notes in the sidebar

### Timer
1. **Stopwatch**: Click Start to begin tracking time
2. **Countdown**: Set duration in minutes and click Start
3. Use quick presets for common durations
4. Enable browser notifications for alerts

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Tasks
- `GET /api/tasks?date=YYYY-MM-DD` - Get tasks for date
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### History
- `GET /api/history` - Get all history
- `DELETE /api/history?date=YYYY-MM-DD` - Delete history entry
- `POST /api/history/restore` - Restore tasks from date

### Materials
- `GET /api/materials` - Get all materials
- `POST /api/materials` - Upload new material
- `DELETE /api/materials/[id]` - Delete material

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/[id]` - Update note
- `DELETE /api/notes/[id]` - Delete note

### Profile
- `GET /api/profile/stats` - Get user statistics

## 🎨 Customization

### Tailwind Theme
Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize primary colors
        500: '#0ea5e9',
        600: '#0284c7',
        // ...
      },
    },
  },
},
```

### Add New Features
The modular structure makes it easy to add new pages:
1. Create a new page in `app/[page-name]/page.tsx`
2. Add API routes in `app/api/[feature]/route.ts`
3. Create a model in `models/[Model].ts`
4. Update the Navbar in `components/layout/Navbar.tsx`

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env.local`
- For Atlas, verify IP whitelist and credentials

### Port Already in Use
```
Error: Port 3000 is already in use
```
Run on a different port:
```bash
PORT=3001 npm run dev
```

### File Upload Issues
- Ensure `public/uploads` directory exists
- Check file size limits (10MB max)
- Verify file permissions on the uploads folder

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables (see [DEPLOYMENT.md](DEPLOYMENT.md))
4. Deploy

**📖 [Complete Deployment Guide](DEPLOYMENT.md)** - Step-by-step instructions for Vercel, Netlify, Railway, and more.

### Why Not GitHub Pages?
This app uses server-side features (API routes, MongoDB, NextAuth) that require a Node.js server. GitHub Pages only supports static sites. See [DEPLOYMENT.md](DEPLOYMENT.md) for compatible platforms.

### Other Platforms
- Ensure Node.js 18+ support
- Set environment variables
- Build command: `npm run build`
- Start command: `npm start`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
