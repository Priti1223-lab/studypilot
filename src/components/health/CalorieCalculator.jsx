import { useState } from 'react'
import { calculateCalories } from '../../utils/calculations'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function CalorieCalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [result, setResult] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    
    const calories = calculateCalories(
      parseFloat(weight),
      parseFloat(height),
      parseInt(age),
      gender,
      activityLevel
    )
    
    setResult(calories)
  }

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setAge('')
    setGender('male')
    setActivityLevel('moderate')
    setResult(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Calorie Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Calculate Daily Calorie Needs">
          <form onSubmit={handleCalculate}>
            <Input
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              step="0.1"
              min="1"
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
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="veryActive">Very Active (intense exercise daily)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Calculate Calories
              </Button>
              <Button type="button" onClick={handleReset} variant="secondary">
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card title="Your Daily Calorie Needs">
            <div className="text-center py-8">
              <p className="text-6xl font-bold text-primary mb-4">
                {result}
              </p>
              <p className="text-xl text-soft mb-8">calories/day</p>
              
              <div className="space-y-4 text-left">
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-1">To Lose Weight</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {result - 500} cal/day
                  </p>
                  <p className="text-xs text-soft">500 cal deficit</p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-1">To Maintain Weight</p>
                  <p className="text-2xl font-bold text-green-400">
                    {result} cal/day
                  </p>
                  <p className="text-xs text-soft">No deficit</p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-1">To Gain Weight</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {result + 500} cal/day
                  </p>
                  <p className="text-xs text-soft">500 cal surplus</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card title="About This Calculator" className="lg:col-span-2">
          <p className="text-gray-300 mb-4">
            This calculator uses the Mifflin-St Jeor equation to estimate your Total Daily Energy Expenditure (TDEE) 
            based on your basal metabolic rate and activity level.
          </p>
          <p className="text-soft text-sm">
            <strong>Note:</strong> These are estimates. Individual calorie needs vary based on metabolism, 
            body composition, and other factors. Adjust based on your actual results.
          </p>
        </Card>
      </div>
    </div>
  )
}
