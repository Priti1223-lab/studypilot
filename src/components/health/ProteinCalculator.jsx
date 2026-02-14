import { useState } from 'react'
import { calculateProtein } from '../../utils/calculations'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function ProteinCalculator() {
  const [weight, setWeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [result, setResult] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    
    const protein = calculateProtein(parseFloat(weight), activityLevel)
    setResult(protein)
  }

  const handleReset = () => {
    setWeight('')
    setActivityLevel('moderate')
    setResult(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Protein Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Calculate Daily Protein Needs">
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="sedentary">Sedentary (1.2g/kg)</option>
                <option value="light">Light Activity (1.3g/kg)</option>
                <option value="moderate">Moderate Activity (1.5g/kg)</option>
                <option value="active">Active (1.6g/kg)</option>
                <option value="veryActive">Very Active (1.7g/kg)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Calculate Protein
              </Button>
              <Button type="button" onClick={handleReset} variant="secondary">
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card title="Your Daily Protein Needs">
            <div className="text-center py-8">
              <p className="text-6xl font-bold text-primary mb-4">
                {result}g
              </p>
              <p className="text-xl text-soft mb-8">protein per day</p>
              
              <div className="space-y-3 text-left">
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">Per Meal (3 meals)</p>
                  <p className="text-2xl font-bold text-green-400">
                    ~{Math.round(result / 3)}g
                  </p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">Example: Chicken Breast</p>
                  <p className="text-lg text-gray-300">
                    {Math.round((result / 31) * 100)}g (~{Math.round(result / 31)} pieces)
                  </p>
                  <p className="text-xs text-soft">31g protein per 100g</p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">Example: Eggs</p>
                  <p className="text-lg text-gray-300">
                    {Math.round(result / 6)} eggs
                  </p>
                  <p className="text-xs text-soft">6g protein per egg</p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">Example: Paneer</p>
                  <p className="text-lg text-gray-300">
                    {Math.round((result / 18) * 100)}g
                  </p>
                  <p className="text-xs text-soft">18g protein per 100g</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card title="About Protein Requirements" className="lg:col-span-2">
          <p className="text-gray-300 mb-4">
            Protein requirements vary based on activity level. The recommended range is 1.2-1.7g per kg of body weight:
          </p>
          <ul className="space-y-2 text-soft text-sm">
            <li>• <strong>Sedentary:</strong> 1.2g/kg - Minimal physical activity</li>
            <li>• <strong>Light:</strong> 1.3g/kg - Light exercise 1-3 days/week</li>
            <li>• <strong>Moderate:</strong> 1.5g/kg - Moderate exercise 3-5 days/week</li>
            <li>• <strong>Active:</strong> 1.6g/kg - Intense exercise 6-7 days/week</li>
            <li>• <strong>Very Active:</strong> 1.7g/kg - Daily intense training or muscle building</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
