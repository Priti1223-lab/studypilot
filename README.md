# StudyPilot - NEET Study & Health Dashboard

A complete production-ready web application for NEET students combining study tracking and health monitoring features.

## 🚀 Features

### Authentication
- ✅ Email/password signup & login
- ✅ Secure user authentication with Supabase
- ✅ Protected routes

### Study Module
1. **Dashboard**
   - Today's study target and completed hours
   - Study streak counter with automatic calculation
   - Daily motivational quotes
   - Progress tracking

2. **Daily MCQ Practice**
   - 10 random Biology MCQs per day
   - Score tracking and persistence
   - One attempt per day limit
   - Automatic weak chapter detection

3. **Weak Chapter Tracker**
   - Track chapters where mistakes occur
   - Mistake count per chapter
   - Subject categorization
   - Delete chapters when improved

4. **Revision Planner**
   - Spaced repetition system (1-3-7-15 days)
   - Automatic schedule generation
   - Mark chapters as completed
   - Visual revision timeline

5. **Mistake Notebook**
   - Document mistakes with descriptions
   - Tag by chapter and subject
   - Search functionality
   - Date tracking

### Health Module
1. **BMI Calculator**
   - Calculate Body Mass Index
   - Category classification
   - Visual result display

2. **Calorie Calculator**
   - Mifflin-St Jeor formula
   - Activity level adjustment
   - Weight loss/gain/maintenance targets

3. **Protein Calculator**
   - Activity-based protein needs (1.2-1.7g/kg)
   - Food examples with portions

4. **Water Calculator**
   - Weight-based water intake (35ml/kg)
   - Multiple unit conversions

5. **Weight Gain Planner**
   - Target date calculation
   - Daily calorie surplus computation
   - Health warnings for unsafe rates
   - Recommended timeline

### Charts & Analytics
1. **Weekly Study Hours Chart**
   - Last 7 days visualization
   - Total, average, and max statistics
   - Line chart with Chart.js

2. **Weight Tracking Chart**
   - 30-day weight history
   - Progress visualization
   - Min/max/change statistics

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Charts**: Chart.js + react-chartjs-2
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
studypilot/
├── src/
│   ├── components/
│   │   ├── auth/           # Login, Signup
│   │   ├── dashboard/      # Dashboard components
│   │   ├── study/          # MCQ, Weak chapters, Revision, Mistakes
│   │   ├── health/         # BMI, Calories, Protein, Water, Weight gain
│   │   ├── charts/         # Study hours, Weight tracking
│   │   ├── layout/         # Navbar, Sidebar
│   │   └── common/         # Button, Input, Card
│   ├── hooks/              # useAuth hook
│   ├── lib/                # Supabase client, MCQ data
│   ├── utils/              # Calculations helper
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/
├── .env.example            # Environment variables template
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### Step 1: Clone and Install

```bash
# Clone the repository (or download the files)
cd studypilot

# Install dependencies
npm install
```

### Step 2: Supabase Setup

1. **Create a Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Fill in project details
   - Wait for setup to complete

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy the `Project URL`
   - Copy the `anon/public` key

3. **Run the SQL Schema**
   - Go to SQL Editor in Supabase
   - Copy the entire SQL schema from this README (see below)
   - Click "Run"

4. **Create Environment File**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

5. **Add Your Credentials**
   Edit `.env` file:
   ```env
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### Step 3: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### Step 4: Build for Production

```bash
npm run build
```

## 📊 Database Schema (SQL)

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Study sessions table
CREATE TABLE public.study_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  hours_studied DECIMAL(4,2) NOT NULL,
  target_hours DECIMAL(4,2) DEFAULT 8.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own study sessions" ON public.study_sessions
  FOR ALL USING (auth.uid() = user_id);

-- MCQ attempts table
CREATE TABLE public.mcq_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mcq_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own MCQ attempts" ON public.mcq_attempts
  FOR ALL USING (auth.uid() = user_id);

-- Weak chapters table
CREATE TABLE public.weak_chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  chapter_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  mistake_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chapter_name, subject)
);

ALTER TABLE public.weak_chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own weak chapters" ON public.weak_chapters
  FOR ALL USING (auth.uid() = user_id);

-- Revision schedule table
CREATE TABLE public.revision_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  chapter_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  first_revision DATE NOT NULL,
  second_revision DATE NOT NULL,
  third_revision DATE NOT NULL,
  fourth_revision DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.revision_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own revision schedule" ON public.revision_schedule
  FOR ALL USING (auth.uid() = user_id);

-- Mistake notebook table
CREATE TABLE public.mistake_notebook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  mistake_text TEXT NOT NULL,
  chapter_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mistake_notebook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own mistakes" ON public.mistake_notebook
  FOR ALL USING (auth.uid() = user_id);

-- Weight tracking table
CREATE TABLE public.weight_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

ALTER TABLE public.weight_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own weight data" ON public.weight_tracking
  FOR ALL USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weak_chapters_updated_at BEFORE UPDATE ON public.weak_chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

### Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

## 📱 Features Overview

### Study Tracking
- **Smart MCQ System**: Daily practice with automatic weak chapter detection
- **Spaced Repetition**: Science-backed revision scheduling
- **Progress Analytics**: Visual charts and statistics
- **Mistake Documentation**: Searchable notebook for learning from errors

### Health Tracking
- **BMI Monitoring**: Track body composition
- **Calorie Planning**: Precise TDEE calculations
- **Nutrition Goals**: Protein and water intake targets
- **Weight Management**: Smart gain/loss planning with safety checks

### User Experience
- **Dark Theme**: Eye-friendly design for long study sessions
- **Mobile Responsive**: Works perfectly on all devices
- **Fast Performance**: Optimized with Vite
- **Secure**: Row-level security with Supabase

## 🔒 Security Features

- Row Level Security (RLS) on all tables
- User data isolation
- Secure authentication
- Environment variable protection

## 🎯 Usage Tips

1. **Daily Routine**
   - Log study hours at end of day
   - Complete daily MCQ practice
   - Track weight in the morning

2. **Weekly Review**
   - Check study hours chart
   - Review weak chapters
   - Adjust targets as needed

3. **Health Monitoring**
   - Use calculators to set goals
   - Track weight weekly
   - Adjust nutrition plan monthly

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Issues
- Verify `.env` file exists
- Check credentials are correct
- Ensure RLS policies are created

### Chart Not Displaying
- Verify data exists in database
- Check browser console for errors
- Ensure Chart.js is properly installed

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Developer Notes

- All calculations are client-side for performance
- Database queries are optimized with proper indexing
- Components are modular and reusable
- Code follows React best practices

## 🤝 Contributing

Feel free to fork, modify, and create pull requests!

## 📞 Support

For issues, please check:
1. Environment variables are correct
2. Supabase schema is properly set up
3. All dependencies are installed
4. Node version is 18+

---

Built with ❤️ for NEET aspirants
```
