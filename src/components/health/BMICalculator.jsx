import { useState } from 'react'
import { calculateBMI, getBMICategory } from '../../utils/calculations'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    
    const bmi = calculateBMI(parseFloat(weight), parseFloat(height))
    const category = getBMICategory(parseFloat(bmi))
    
    setResult({ bmi, category })
  }

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setResult(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">BMI Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Calculate Your BMI">
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

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Calculate BMI
              </Button>
              <Button type="button" onClick={handleReset} variant="secondary">
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card title="Your BMI Result">
            <div className="text-center py-8">
              <p className="text-6xl font-bold text-primary mb-4">
                {result.bmi}
              </p>
              <p className={`text-2xl font-semibold mb-6 ${result.category.color}`}>
                {result.category.category}
              </p>
              
              <div className="space-y-2 text-left">
                <div className="flex justify-between p-3 bg-dark-bg rounded-lg">
                  <span className="text-yellow-400">Underweight</span>
                  <span className="text-soft">&lt; 18.5</span>
                </div>
                <div className="flex justify-between p-3 bg-dark-bg rounded-lg">
                  <span className="text-green-400">Normal</span>
                  <span className="text-soft">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between p-3 bg-dark-bg rounded-lg">
                  <span className="text-orange-400">Overweight</span>
                  <span className="text-soft">25 - 29.9</span>
                </div>
                <div className="flex justify-between p-3 bg-dark-bg rounded-lg">
                  <span className="text-red-400">Obese</span>
                  <span className="text-soft">≥ 30</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card title="About BMI" className="lg:col-span-2">
          <p className="text-gray-300 mb-4">
            Body Mass Index (BMI) is a measure of body fat based on height and weight. 
            It's a useful screening tool, but it doesn't directly measure body fat percentage.
          </p>
          <p className="text-soft text-sm">
            <strong>Note:</strong> BMI may not be accurate for athletes, pregnant women, 
            or people with high muscle mass. Consult a healthcare provider for personalized advice.
          </p>
        </Card>
      </div>
    </div>
  )
}
