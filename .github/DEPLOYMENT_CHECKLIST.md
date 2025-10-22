# ✅ Deployment Checklist

Use this checklist when deploying your Scheduled Dairy application.

## Pre-Deployment

- [ ] Read `QUICK_DEPLOY.md` or `DEPLOYMENT.md`
- [ ] Have Node.js 18+ installed locally
- [ ] Code builds successfully locally (`npm run build`)
- [ ] All environment variables identified

## MongoDB Setup

- [ ] MongoDB Atlas account created (or local MongoDB running)
- [ ] Database cluster created
- [ ] Connection string obtained
- [ ] IP whitelist configured (0.0.0.0/0 for cloud deployments)
- [ ] Database credentials secured

## Environment Variables

Required for deployment:

- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `NEXTAUTH_SECRET` - Generated with `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` - Your deployment URL

## Deployment Platform (Choose One)

### Option 1: Vercel
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Environment variables added
- [ ] Build settings confirmed
- [ ] First deployment successful
- [ ] `NEXTAUTH_URL` updated with actual URL
- [ ] Redeployment after URL update

### Option 2: Netlify
- [ ] Netlify account created
- [ ] GitHub repository connected
- [ ] Environment variables added
- [ ] Build settings configured
- [ ] Deployment successful

### Option 3: Railway
- [ ] Railway account created
- [ ] Project created
- [ ] GitHub repository connected
- [ ] Environment variables added
- [ ] Deployment successful

### Option 4: Other Platform
- [ ] Platform supports Node.js 18+
- [ ] Environment variables configured
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`
- [ ] Deployment successful

## Post-Deployment Testing

- [ ] Website loads at deployment URL
- [ ] Sign up page works
- [ ] New user registration successful
- [ ] Login works with created account
- [ ] Dashboard/home page displays correctly
- [ ] Tasks page:
  - [ ] Can create new task
  - [ ] Can edit task
  - [ ] Can delete task
  - [ ] Can mark task complete
- [ ] History page:
  - [ ] Shows previous tasks
  - [ ] Can view history details
- [ ] Materials page:
  - [ ] Can view materials (or empty state)
  - [ ] Upload functionality works (if testing)
- [ ] Notes page:
  - [ ] Can create new note
  - [ ] Can edit note
  - [ ] Rich text editor works
  - [ ] Can save note
- [ ] Timer page:
  - [ ] Stopwatch works
  - [ ] Countdown timer works
  - [ ] Timers count correctly
- [ ] Profile page:
  - [ ] User information displays
  - [ ] Statistics load correctly
- [ ] Navigation:
  - [ ] All links work
  - [ ] Navbar functions correctly
  - [ ] Mobile menu works (test on phone)
- [ ] Authentication:
  - [ ] Logout works
  - [ ] Login redirects work
  - [ ] Protected routes require auth

## Optional Enhancements

- [ ] Custom domain configured
- [ ] SSL/HTTPS enabled (usually automatic)
- [ ] Analytics added (Vercel Analytics, Google Analytics)
- [ ] Error monitoring setup (Sentry, LogRocket)
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Backup strategy for database
- [ ] Environment-specific configurations

## Documentation

- [ ] README.md updated with deployment URL
- [ ] Team informed of deployment
- [ ] Deployment credentials secured
- [ ] Monitoring dashboards bookmarked

## Troubleshooting

If issues occur:

1. Check deployment logs in platform dashboard
2. Verify all environment variables are set correctly
3. Test MongoDB connection separately
4. Check browser console for frontend errors
5. Review `DEPLOYMENT.md` troubleshooting section
6. Ensure Node.js version matches (18+)

## Continuous Deployment

- [ ] Automatic deployments configured
- [ ] Git workflow understood (main branch = production)
- [ ] Preview deployments for PRs enabled
- [ ] Build notifications configured

## Success! 🎉

Once all items are checked:
- Your application is live and accessible
- Users can access it at your deployment URL
- Future git pushes will auto-deploy
- You have a production-ready web application!

---

**Need help?** See `DEPLOYMENT.md` for detailed guides and troubleshooting.
