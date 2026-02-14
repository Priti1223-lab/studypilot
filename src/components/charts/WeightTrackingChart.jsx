import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function WeightTrackingChart() {
  const { user } = useAuth()
  const [chartData, setChartData] = useState(null)
  const [weight, setWeight] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ current: 0, change: 0, min: 0, max: 0 })

  useEffect(() => {
    if (user) {
      loadWeightData()
    }
  }, [user])

  const loadWeightData = async () => {
    const today = new Date()
    const thirtyDaysAgo = new Date(today)
    thirtyDaysAgo.setDate(today.getDate() - 29)

    const { data, error } = await supabase
      .from('weight_tracking')
      .select('date, weight')
      .eq('user_id', user.id)
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (data && data.length > 0) {
      const labels = data.map(item => {
        const date = new Date(item.date)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      })
      
      const weights = data.map(item => parseFloat(item.weight))

      setChartData({
        labels,
        datasets: [
          {
            label: 'Weight (kg)',
            data: weights,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      })

      const current = weights[weights.length - 1]
      const start = weights[0]
      const change = current - start
      const min = Math.min(...weights)
      const max = Math.max(...weights)

      setStats({
        current: current.toFixed(1),
        change: change.toFixed(1),
        min: min.toFixed(1),
        max: max.toFixed(1),
      })
    } else {
      setChartData(null)
    }
  }

  const handleAddWeight = async (e) => {
    e.preventDefault()
    setLoading(true)

    const today = new Date().toISOString().split('T')[0]

    const { error } = await supabase
      .from('weight_tracking')
      .upsert([
        {
          user_id: user.id,
          date: today,
          weight: parseFloat(weight),
        }
      ], {
        onConflict: 'user_id,date',
      })

    if (!error) {
      setWeight('')
      loadWeightData()
    }

    setLoading(false)
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#f1f5f9',
        borderColor: '#334155',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} kg`
          }
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#94a3b8',
          callback: function(value) {
            return value + ' kg'
          }
        },
        grid: {
          color: '#334155',
        },
      },
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: '#334155',
        },
      },
    },
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Weight Tracking</h1>

      <Card title="Log Today's Weight" className="mb-6">
        <form onSubmit={handleAddWeight} className="flex gap-4">
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            step="0.1"
            min="1"
            required
            className="flex-1 mb-0"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </form>
      </Card>

      {chartData && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <div className="text-center">
                <p className="text-sm text-soft mb-2">Current</p>
                <p className="text-3xl font-bold text-green-400">{stats.current} kg</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-sm text-soft mb-2">Change</p>
                <p className={`text-3xl font-bold ${parseFloat(stats.change) >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                  {parseFloat(stats.change) >= 0 ? '+' : ''}{stats.change} kg
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-sm text-soft mb-2">Minimum</p>
                <p className="text-3xl font-bold text-soft">{stats.min} kg</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-sm text-soft mb-2">Maximum</p>
                <p className="text-3xl font-bold text-soft">{stats.max} kg</p>
              </div>
            </Card>
          </div>

          <Card title="Last 30 Days">
            <div className="h-80">
              <Line data={chartData} options={options} />
            </div>
          </Card>
        </>
      )}

      {!chartData && (
        <Card>
          <p className="text-soft text-center py-16">
            No weight data yet. Start tracking by adding your weight above.
          </p>
        </Card>
      )}
    </div>
  )
}
