# StudyPilot - Deployment Guide

## Quick Start Deployment (5 minutes)

### Prerequisites
✅ Node.js 18+ installed
✅ Supabase account (free)
✅ Vercel account (free)

---

## 1️⃣ Supabase Setup (2 minutes)

### Create Project
1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - Name: `studypilot`
   - Database Password: (generate strong password)
   - Region: Choose closest to you
4. Click **"Create new project"**
5. Wait 2 minutes for setup

### Get Credentials
1. Click **Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key (under Project API keys)

### Setup Database
1. Click **SQL Editor** in left sidebar
2. Click **"New Query"**
3. Copy entire SQL from README.md (Database Schema section)
4. Paste and click **"Run"**
5. You should see: "Success. No rows returned"

---

## 2️⃣ Local Setup (1 minute)

```bash
# Navigate to project
cd studypilot

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Test locally:
```bash
npm run dev
```
Visit: http://localhost:3000

---

## 3️⃣ Vercel Deployment (2 minutes)

### Option A: GitHub + Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "StudyPilot initial commit"
git branch -M main
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/studypilot.git
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Click **"Import Git Repository"**
   - Select your `studypilot` repo
   - Click **"Import"**

3. **Configure Project**
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)

4. **Add Environment Variables**
   Click **"Environment Variables"**, add:
   
   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | Your Supabase URL |
   | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2 minutes
   - Your app is live! 🎉

### Option B: Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? studypilot
# - Directory? ./
# - Override settings? N

# Add environment variables
vercel env add VITE_SUPABASE_URL
# Paste your Supabase URL when prompted
# Select: Production, Preview, Development (all)

vercel env add VITE_SUPABASE_ANON_KEY
# Paste your Supabase anon key when prompted
# Select: Production, Preview, Development (all)

# Deploy to production
vercel --prod
```

---

## 4️⃣ Post-Deployment

### Test Your Deployment
1. Visit your Vercel URL: `https://studypilot.vercel.app` (or your custom domain)
2. Click **"Sign up"**
3. Create test account
4. Verify all features work:
   - ✅ Dashboard loads
   - ✅ MCQ practice works
   - ✅ Charts display
   - ✅ Calculators function

### Custom Domain (Optional)
1. In Vercel dashboard → **Settings** → **Domains**
2. Add your domain
3. Update DNS records as shown
4. Wait for verification (up to 24 hours)

---

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public anonymous key | `eyJhbGci...` |

⚠️ **Important**: Never commit `.env` to GitHub!

---

## 🚨 Troubleshooting

### Issue: "Invalid API key"
**Solution**: Double-check your `VITE_SUPABASE_ANON_KEY` in Vercel environment variables

### Issue: "Database connection failed"
**Solution**: 
1. Verify Supabase project is active
2. Check `VITE_SUPABASE_URL` is correct
3. Ensure SQL schema was run successfully

### Issue: Build fails on Vercel
**Solution**:
```bash
# Test build locally first
npm run build

# If it works locally, clear Vercel cache:
# In Vercel dashboard → Deployments → (latest) → ... → Redeploy
```

### Issue: Charts not showing
**Solution**: 
1. Log into app
2. Add some data (study hours, weight)
3. Charts need data to display

### Issue: Can't sign up
**Solution**: 
1. Check Supabase → Authentication is enabled
2. Verify email confirmations are disabled for testing
3. Check browser console for errors

---

## 📊 Monitoring

### Supabase Dashboard
- View database tables: **Table Editor**
- Check auth users: **Authentication**
- Monitor usage: **Settings** → **Usage**

### Vercel Dashboard
- View deployment logs: **Deployments** → Click deployment → **Logs**
- Monitor performance: **Analytics**
- Check build status: **Deployments**

---

## 🔄 Updates & Redeployment

### Push Updates
```bash
git add .
git commit -m "Your update message"
git push
```
Vercel auto-deploys on every push! ✨

### Manual Redeploy
Vercel dashboard → **Deployments** → (latest) → **⋯** → **Redeploy**

---

## 🎯 Production Checklist

Before going live:

- [ ] Supabase project created
- [ ] SQL schema executed
- [ ] Environment variables added to Vercel
- [ ] Test signup/login works
- [ ] Test all features (MCQ, calculators, charts)
- [ ] Mobile responsive check
- [ ] Custom domain configured (optional)
- [ ] Backup plan (GitHub repo)

---

## 📈 Scaling Considerations

### Free Tier Limits
- **Supabase**: 500MB database, 2GB bandwidth/month
- **Vercel**: 100GB bandwidth/month, unlimited sites

### Upgrade When
- 500+ active users
- 50GB+ database
- Need custom domains
- Require priority support

---

## 🔒 Security Checklist

- [x] Row Level Security enabled on all tables
- [x] Environment variables not in code
- [x] HTTPS enforced (automatic on Vercel)
- [x] User data isolated per account
- [x] API keys are public-safe (anon key only)

---

## 💡 Pro Tips

1. **Faster Builds**: Use `npm ci` instead of `npm install` in CI/CD
2. **Preview Deployments**: Every branch gets a preview URL on Vercel
3. **Database Backups**: Supabase auto-backs up daily on paid plans
4. **Custom Domain**: Makes app look more professional
5. **Analytics**: Add Vercel Analytics for user insights

---

## 🎉 You're Done!

Your StudyPilot app is now live and production-ready!

Share your deployment: `https://studypilot.vercel.app`

---

## 📞 Need Help?

1. Check README.md troubleshooting section
2. Review Vercel logs
3. Check Supabase database status
4. Verify all environment variables

**Common Issues Database**:
- 90% of issues = wrong environment variables
- 8% of issues = SQL schema not run
- 2% of issues = actual bugs

---

Built with ❤️ for NEET aspirants

Last updated: 2024
```
