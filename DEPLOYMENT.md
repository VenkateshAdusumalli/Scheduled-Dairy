# 🚀 Deployment Guide for Scheduled Dairy

This guide will help you deploy your Scheduled Dairy application to production.

## 🌐 Why Can't I Use GitHub Pages?

**Important**: This application **cannot** be deployed to GitHub Pages because:
- GitHub Pages only supports **static websites** (HTML, CSS, JavaScript)
- Your app requires:
  - **Server-side rendering** (Next.js SSR)
  - **API routes** for backend functionality
  - **Database connection** (MongoDB)
  - **Authentication** (NextAuth)
  - **File uploads** and server-side processing

## ✅ Recommended: Deploy to Vercel (FREE)

Vercel is the recommended platform as it's built by the creators of Next.js and offers:
- ✅ Free tier (perfect for personal projects)
- ✅ Automatic HTTPS
- ✅ Automatic deployments from GitHub
- ✅ Environment variable management
- ✅ Built-in CDN
- ✅ Serverless functions support

### Step-by-Step Vercel Deployment

#### 1. Prepare MongoDB Database

**Option A: MongoDB Atlas (Free Tier)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (e.g., `mongodb+srv://username:<password>@cluster.mongodb.net/scheduled-dairy`)
6. Replace `<password>` with your actual password
7. Whitelist all IPs (0.0.0.0/0) in Network Access for Vercel

#### 2. Generate NextAuth Secret

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Save the output - you'll need it for environment variables.

#### 3. Deploy to Vercel

**Method 1: Using Vercel Dashboard (Easiest)**

1. Go to [Vercel](https://vercel.com) and sign up/login (use GitHub account)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `VenkateshAdusumalli/Scheduled-Dairy`
4. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (keep default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. **Add Environment Variables** (Click "Environment Variables"):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scheduled-dairy
   NEXTAUTH_SECRET=your-generated-secret-from-step-2
   NEXTAUTH_URL=https://your-project-name.vercel.app
   ```
   
   **Note**: For `NEXTAUTH_URL`, initially use a placeholder like `https://scheduled-dairy.vercel.app`, then update it after deployment with your actual Vercel URL.

6. Click "Deploy"
7. Wait for deployment to complete (2-3 minutes)
8. Once deployed, copy your Vercel URL (e.g., `https://scheduled-dairy-xyz.vercel.app`)

9. **Update Environment Variables**:
   - Go to your project settings in Vercel
   - Update `NEXTAUTH_URL` with your actual Vercel URL
   - Redeploy (Settings → Deployments → click ⋯ on latest → Redeploy)

**Method 2: Using Vercel CLI**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   cd "Scheduled Dairy"
   vercel
   ```

4. Follow the prompts and add environment variables when asked.

#### 4. Create uploads directory on first deploy

After first deployment, you may need to ensure file uploads work:
- The `public/uploads` directory should be created automatically
- For persistent file storage, consider using cloud storage (AWS S3, Cloudinary) in production

#### 5. Test Your Deployment

1. Visit your Vercel URL
2. Sign up for a new account
3. Test all features:
   - Create tasks
   - Add notes
   - Upload materials (if file storage is configured)
   - Use the timer
   - Check profile statistics

### Automatic Deployments

Once connected to Vercel:
- Every push to your `main` branch → automatic production deployment
- Every pull request → automatic preview deployment
- View deployment logs in Vercel dashboard

---

## 🔄 Alternative Deployment Options

### Option 1: Netlify

Netlify also supports Next.js apps:

1. Go to [Netlify](https://www.netlify.com)
2. Import your GitHub repository
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Add the same environment variables as Vercel
5. Deploy

**Note**: Netlify's Next.js support is good but Vercel is optimized for Next.js.

### Option 2: Railway

Railway offers free tier with database hosting:

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Add environment variables
5. Railway can also host your MongoDB database

### Option 3: Render

1. Go to [Render](https://render.com)
2. New → Web Service
3. Connect your GitHub repository
4. Settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables
6. Create Web Service

### Option 4: Self-Hosted (VPS)

For full control, deploy to a VPS (DigitalOcean, AWS EC2, etc.):

1. SSH into your server
2. Install Node.js 18+ and MongoDB
3. Clone your repository
4. Install dependencies: `npm install`
5. Create `.env.local` with your environment variables
6. Build: `npm run build`
7. Start with PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "scheduled-dairy" -- start
   pm2 save
   pm2 startup
   ```
8. Configure nginx as reverse proxy
9. Set up SSL with Let's Encrypt

---

## 📝 Environment Variables Reference

Required environment variables for production:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `NEXTAUTH_SECRET` | Secret for NextAuth encryption | `generated-random-string` |
| `NEXTAUTH_URL` | Your deployment URL | `https://your-app.vercel.app` |

---

## 🔧 Troubleshooting

### Build Fails

**Error**: "Module not found"
- **Solution**: Run `npm install` locally and ensure `package.json` is correct

**Error**: "MongoDB connection failed"
- **Solution**: Check MongoDB URI is correct and IP whitelist includes 0.0.0.0/0

### Authentication Issues

**Error**: "NextAuth configuration error"
- **Solution**: Ensure `NEXTAUTH_URL` matches your actual deployment URL
- **Solution**: Ensure `NEXTAUTH_SECRET` is set

### File Upload Issues

**Error**: "Cannot write to uploads directory"
- **Solution**: For production, use cloud storage (Cloudinary, AWS S3)
- **Solution**: Vercel's filesystem is read-only except for /tmp

---

## 🎯 Post-Deployment Checklist

- [ ] Website loads correctly at your Vercel URL
- [ ] User registration works
- [ ] User login works
- [ ] Can create and view tasks
- [ ] Can create and view notes
- [ ] Timer functionality works
- [ ] Profile page displays statistics
- [ ] All environment variables are set correctly
- [ ] Database connection is working
- [ ] Custom domain configured (optional)

---

## 🌍 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to your project in Vercel
2. Settings → Domains
3. Add your domain (e.g., `scheduleddairy.com`)
4. Follow DNS configuration instructions
5. Update `NEXTAUTH_URL` to your custom domain
6. Redeploy

---

## 📊 Monitoring & Analytics

After deployment, consider adding:
- **Vercel Analytics**: Built-in, click to enable in project settings
- **Error tracking**: Sentry, LogRocket
- **Uptime monitoring**: UptimeRobot, Pingdom

---

## 💰 Pricing

### Vercel Free Tier Limits
- ✅ Unlimited personal projects
- ✅ 100GB bandwidth per month
- ✅ 6000 build minutes per month
- ✅ Serverless function executions included

Perfect for personal use and small projects!

---

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test MongoDB connection separately
5. Review [Vercel Next.js documentation](https://vercel.com/docs/frameworks/nextjs)

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
