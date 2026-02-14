// BMI Calculation
export function calculateBMI(weight, height) {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  return bmi.toFixed(2)
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return { category: 'Underweight', color: 'text-yellow-400' }
  if (bmi < 25) return { category: 'Normal', color: 'text-green-400' }
  if (bmi < 30) return { category: 'Overweight', color: 'text-orange-400' }
  return { category: 'Obese', color: 'text-red-400' }
}

// Calorie Calculation - Mifflin St Jeor Formula
export function calculateCalories(weight, height, age, gender, activityLevel) {
  let bmr
  
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  }
  
  const tdee = bmr * activityMultipliers[activityLevel]
  return Math.round(tdee)
}

// Protein Calculation (1.2-1.7g per kg)
export function calculateProtein(weight, activityLevel) {
  const multipliers = {
    sedentary: 1.2,
    light: 1.3,
    moderate: 1.5,
    active: 1.6,
    veryActive: 1.7
  }
  
  const protein = weight * multipliers[activityLevel]
  return Math.round(protein)
}

// Water Intake Calculation (weight-based)
export function calculateWater(weight) {
  // Basic formula: 35ml per kg
  const waterML = weight * 35
  const waterLiters = waterML / 1000
  return waterLiters.toFixed(1)
}

// Weight Gain Planner
export function calculateWeightGainPlan(currentWeight, targetWeight, targetDate, tdee) {
  const today = new Date()
  const target = new Date(targetDate)
  const daysToTarget = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  
  if (daysToTarget <= 0) {
    return { error: 'Target date must be in the future' }
  }
  
  const weightToGain = targetWeight - currentWeight
  const weeksToTarget = daysToTarget / 7
  
  // Safe weight gain: 0.25-0.5 kg per week
  const recommendedWeeklyGain = 0.5
  const recommendedWeeks = weightToGain / recommendedWeeklyGain
  
  // 1 kg fat = ~7700 calories
  const totalCaloriesNeeded = weightToGain * 7700
  const dailySurplus = totalCaloriesNeeded / daysToTarget
  const dailyCalories = tdee + dailySurplus
  
  return {
    daysToTarget,
    weeksToTarget: weeksToTarget.toFixed(1),
    weightToGain: weightToGain.toFixed(1),
    recommendedWeeks: recommendedWeeks.toFixed(1),
    dailySurplus: Math.round(dailySurplus),
    dailyCalories: Math.round(dailyCalories),
    isSafe: dailySurplus <= 500 // Max 500 cal surplus for healthy gain
  }
}

// Study streak calculation
export function calculateStreak(studySessions) {
  if (!studySessions || studySessions.length === 0) return 0
  
  const sortedSessions = [...studySessions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )
  
  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  
  for (const session of sortedSessions) {
    const sessionDate = new Date(session.date)
    sessionDate.setHours(0, 0, 0, 0)
    
    const diffDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24))
    
    if (diffDays === streak) {
      streak++
      currentDate = sessionDate
    } else if (diffDays > streak) {
      break
    }
  }
  
  return streak
}

// Motivational quotes
const motivationalQuotes = [
  "Success is the sum of small efforts repeated day in and day out.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "Hard work beats talent when talent doesn't work hard.",
  "Your only limit is you.",
  "Dream it. Believe it. Build it.",
  "The expert in anything was once a beginner.",
  "Every accomplishment starts with the decision to try.",
  "Believe you can and you're halfway there.",
  "Success doesn't come from what you do occasionally, it comes from what you do consistently."
]

export function getDailyMotivation() {
  const today = new Date().getDate()
  return motivationalQuotes[today % motivationalQuotes.length]
}
