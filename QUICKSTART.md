# StudyPilot - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Install Dependencies (30 seconds)
```bash
cd studypilot
npm install
```

### 2. Setup Supabase (2 minutes)

**Create Project:**
1. Visit https://supabase.com → New Project
2. Name: `studypilot`, choose password & region
3. Wait for setup to complete

**Get Credentials:**
- Settings → API → Copy "Project URL" and "anon public" key

**Setup Database:**
- SQL Editor → New Query → Paste SQL from README.md → Run

### 3. Configure Environment (30 seconds)
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

### 4. Run Development Server (10 seconds)
```bash
npm run dev
```

Visit: http://localhost:3000

### 5. Create Account & Test
1. Click "Sign up"
2. Enter email & password
3. Explore features!

---

## ✅ Feature Checklist

Test each feature after setup:

### Study Module
- [ ] Dashboard shows today's stats
- [ ] Daily MCQ quiz works (10 questions)
- [ ] Can add weak chapters
- [ ] Revision planner creates schedules
- [ ] Mistake notebook saves notes

### Health Module
- [ ] BMI calculator computes correctly
- [ ] Calorie calculator gives results
- [ ] Protein calculator works
- [ ] Water calculator displays
- [ ] Weight gain planner creates plan

### Charts
- [ ] Study hours chart (after logging hours)
- [ ] Weight tracking chart (after adding weight)

---

## 🎯 First Steps After Login

1. **Log Today's Study Hours**
   - Dashboard → Enter hours → Update

2. **Take Daily MCQ**
   - Sidebar → Daily MCQ → Start Quiz

3. **Add Your Stats**
   - Try BMI Calculator with your weight/height
   - Try Calorie Calculator with your info

4. **Track Weight**
   - Weight Chart → Add today's weight

---

## 📱 Mobile Testing

Open on phone:
- Desktop: `http://localhost:3000`
- Phone: `http://YOUR_IP:3000`

Get your IP:
```bash
# Mac/Linux
ipconfig getifaddr en0

# Windows
ipconfig
```

---

## 🚀 Deploy to Production

See `DEPLOYMENT.md` for full guide.

Quick version:
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Deploy on Vercel
# 1. Import GitHub repo
# 2. Add environment variables
# 3. Deploy
```

---

## 🐛 Common Issues

**"Supabase connection failed"**
→ Check `.env` file has correct credentials

**"Charts not showing"**
→ Add data first (study hours, weight)

**"Build errors"**
→ Delete node_modules and run `npm install` again

**"Can't sign up"**
→ Verify SQL schema was run in Supabase

---

## 💡 Usage Tips

### Daily Routine
- Morning: Log yesterday's study hours
- Study: Take daily MCQ practice
- Evening: Review weak chapters

### Weekly
- Check study hours chart
- Track weight progress
- Plan next week's revision

### Monthly
- Review all weak chapters
- Adjust health goals
- Update weight gain plan

---

## 📊 Understanding Features

### Study Streak
- Counts consecutive days with study hours logged
- Resets if you skip a day
- Motivates daily consistency

### Spaced Repetition (1-3-7-15)
- Day 1: First review
- Day 3: Second review
- Day 7: Third review
- Day 15: Final review
- Science-backed for retention

### Weak Chapters
- Auto-added from MCQ mistakes
- Manually add problem areas
- Track improvement over time

---

## 🎨 Customization Ideas

Want to modify?

**Change Theme Colors:**
- Edit `tailwind.config.js` → colors section

**Add More MCQs:**
- Edit `src/lib/mcqData.js` → add questions

**Change Target Hours:**
- Edit `src/components/dashboard/DashboardStats.jsx` → line 10

**Modify Calculators:**
- Edit formulas in `src/utils/calculations.js`

---

## 📚 Learning Resources

**React:**
- https://react.dev/learn

**TailwindCSS:**
- https://tailwindcss.com/docs

**Supabase:**
- https://supabase.com/docs

**Chart.js:**
- https://www.chartjs.org/docs

---

## 🔐 Security Notes

- ✅ All user data is isolated
- ✅ Passwords are hashed by Supabase
- ✅ Row Level Security enabled
- ✅ Environment variables protected
- ✅ HTTPS enforced in production

---

## 🎓 For NEET Students

**Study Tips:**
- Use Daily MCQ for quick revision
- Mark weak chapters immediately
- Follow the spaced repetition schedule
- Track study hours honestly
- Maintain consistency (streak!)

**Health Tips:**
- Calculate your calorie needs
- Track protein intake daily
- Stay hydrated (use water calculator)
- Monitor weight if bulking/cutting
- Prioritize sleep & recovery

---

## ⭐ Pro Features Coming Soon

- Export study data to CSV
- More MCQ subjects (Physics, Chemistry)
- Study analytics dashboard
- Mobile app version
- Social features (study groups)
- Pomodoro timer integration

---

## 🤝 Contribute

Found a bug? Have an idea?
- Open an issue on GitHub
- Submit a pull request
- Share feedback

---

## 📞 Support

Stuck? Check:
1. README.md (full documentation)
2. DEPLOYMENT.md (deployment guide)
3. This guide (quick reference)

90% of issues = environment variables not set correctly!

---

**Happy Studying! 🎯📚**

You've got this, NEET aspirant! 💪
```
