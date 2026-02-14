import { useState } from 'react'
import { calculateCalories, calculateWeightGainPlan } from '../../utils/calculations'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function WeightGainPlanner() {
  const [currentWeight, setCurrentWeight] = useState('')
  const [targetWeight, setTargetWeight] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [result, setResult] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    
    const tdee = calculateCalories(
      parseFloat(currentWeight),
      parseFloat(height),
      parseInt(age),
      gender,
      activityLevel
    )
    
    const plan = calculateWeightGainPlan(
      parseFloat(currentWeight),
      parseFloat(targetWeight),
      targetDate,
      tdee
    )
    
    if (plan.error) {
      alert(plan.error)
      return
    }
    
    setResult({ ...plan, tdee })
  }

  const handleReset = () => {
    setCurrentWeight('')
    setTargetWeight('')
    setTargetDate('')
    setHeight('')
    setAge('')
    setGender('male')
    setActivityLevel('moderate')
    setResult(null)
  }

  const getTodayDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Weight Gain Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Plan Your Weight Gain">
          <form onSubmit={handleCalculate}>
            <Input
              label="Current Weight (kg)"
              type="number"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="65"
              step="0.1"
              min="1"
              required
            />

            <Input
              label="Target Weight (kg)"
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="75"
              step="0.1"
              min="1"
              required
            />

            <Input
              label="Target Date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={getTodayDate()}
              required
            />

            <Input
              label="Height (cm)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              step="0.1"
              min="1"
              required
            />

            <Input
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="18"
              min="1"
              max="120"
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="veryActive">Very Active</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Create Plan
              </Button>
              <Button type="button" onClick={handleReset} variant="secondary">
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card title="Your Weight Gain Plan">
            <div className="space-y-4">
              {!result.isSafe && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-500 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    ⚠️ <strong>Warning:</strong> Your target requires more than 500 cal/day surplus, 
                    which may lead to excessive fat gain. Consider extending your timeline.
                  </p>
                </div>
              )}

              <div className="p-4 bg-dark-bg rounded-lg">
                <p className="text-sm text-soft mb-1">Weight to Gain</p>
                <p className="text-3xl font-bold text-primary">
                  {result.weightToGain} kg
                </p>
              </div>

              <div className="p-4 bg-dark-bg rounded-lg">
                <p className="text-sm text-soft mb-1">Time Period</p>
                <p className="text-3xl font-bold text-green-400">
                  {result.weeksToTarget} weeks
                </p>
                <p className="text-xs text-soft">{result.daysToTarget} days</p>
              </div>

              <div className="p-4 bg-dark-bg rounded-lg">
                <p className="text-sm text-soft mb-1">Daily Calorie Surplus</p>
                <p className="text-3xl font-bold text-orange-400">
                  +{result.dailySurplus} cal
                </p>
              </div>

              <div className="p-4 bg-dark-bg rounded-lg">
                <p className="text-sm text-soft mb-1">Total Daily Calories</p>
                <p className="text-3xl font-bold text-blue-400">
                  {result.dailyCalories} cal
                </p>
                <p className="text-xs text-soft">
                  Maintenance: {result.tdee} cal
                </p>
              </div>

              <div className="p-4 bg-green-900/20 border border-green-500 rounded-lg">
                <p className="text-sm text-soft mb-1">Recommended Timeline</p>
                <p className="text-2xl font-bold text-green-400">
                  {result.recommendedWeeks} weeks
                </p>
                <p className="text-xs text-soft mt-2">
                  For healthy weight gain at 0.5kg/week
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card title="Weight Gain Tips" className="lg:col-span-2">
          <div className="space-y-3 text-gray-300">
            <p className="font-medium">💪 Healthy Weight Gain Strategies:</p>
            <ul className="space-y-2 text-sm text-soft ml-6">
              <li>• Aim for 0.25-0.5 kg per week for lean muscle gain</li>
              <li>• Eat calorie-dense foods: nuts, dried fruits, nut butter, whole milk</li>
              <li>• Include protein with every meal (1.6-2.2g/kg bodyweight)</li>
              <li>• Strength training 3-4 times per week to build muscle</li>
              <li>• Eat more frequently - 5-6 meals per day</li>
              <li>• Track your weight weekly and adjust calories if needed</li>
              <li>• Stay hydrated and get adequate sleep (7-9 hours)</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
