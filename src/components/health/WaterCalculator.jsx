import { useState } from 'react'
import { calculateWater } from '../../utils/calculations'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function WaterCalculator() {
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    
    const water = calculateWater(parseFloat(weight))
    setResult(water)
  }

  const handleReset = () => {
    setWeight('')
    setResult(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Water Intake Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Calculate Daily Water Needs">
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

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Calculate Water
              </Button>
              <Button type="button" onClick={handleReset} variant="secondary">
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card title="Your Daily Water Needs">
            <div className="text-center py-8">
              <p className="text-6xl font-bold text-primary mb-4">
                {result}L
              </p>
              <p className="text-xl text-soft mb-8">water per day</p>
              
              <div className="space-y-3 text-left">
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">In Milliliters</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {Math.round(parseFloat(result) * 1000)} ml
                  </p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">Standard Glasses (250ml)</p>
                  <p className="text-2xl font-bold text-green-400">
                    {Math.round((parseFloat(result) * 1000) / 250)} glasses
                  </p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">Large Bottles (1L)</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {Math.ceil(parseFloat(result))} bottles
                  </p>
                </div>

                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-sm text-soft mb-2">Hourly Goal (16 hrs awake)</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {Math.round((parseFloat(result) * 1000) / 16)} ml/hour
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card title="About Water Intake" className="lg:col-span-2">
          <p className="text-gray-300 mb-4">
            This calculator uses the standard recommendation of 35ml of water per kg of body weight per day.
          </p>
          <div className="space-y-2 text-soft text-sm">
            <p>💧 <strong>Hydration Tips:</strong></p>
            <ul className="space-y-1 ml-6">
              <li>• Drink water first thing in the morning</li>
              <li>• Keep a water bottle with you during study sessions</li>
              <li>• Increase intake during exercise or hot weather</li>
              <li>• Don't wait until you're thirsty</li>
              <li>• Monitor urine color - pale yellow indicates good hydration</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
