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

export default function StudyHoursChart() {
  const { user } = useAuth()
  const [chartData, setChartData] = useState(null)
  const [stats, setStats] = useState({ total: 0, average: 0, max: 0 })

  useEffect(() => {
    if (user) {
      loadStudyData()
    }
  }, [user])

  const loadStudyData = async () => {
    const today = new Date()
    const sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(today.getDate() - 6)

    const { data, error } = await supabase
      .from('study_sessions')
      .select('date, hours_studied')
      .eq('user_id', user.id)
      .gte('date', sevenDaysAgo.toISOString().split('T')[0])
      .lte('date', today.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (data) {
      const labels = []
      const hours = []
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        
        const session = data.find(s => s.date === dateStr)
        
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
        hours.push(session ? parseFloat(session.hours_studied) : 0)
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Study Hours',
            data: hours,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      })

      const total = hours.reduce((sum, h) => sum + h, 0)
      const average = total / 7
      const max = Math.max(...hours)
      
      setStats({
        total: total.toFixed(1),
        average: average.toFixed(1),
        max: max.toFixed(1),
      })
    }
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
            return `${context.parsed.y} hours`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8',
          callback: function(value) {
            return value + 'h'
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
      <h1 className="text-3xl font-bold text-textc mb-6">Weekly Study Hours</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-soft mb-2">Total This Week</p>
            <p className="text-4xl font-bold text-primary">{stats.total}h</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-soft mb-2">Daily Average</p>
            <p className="text-4xl font-bold text-green-400">{stats.average}h</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-soft mb-2">Best Day</p>
            <p className="text-4xl font-bold text-orange-400">{stats.max}h</p>
          </div>
        </Card>
      </div>

      <Card title="Last 7 Days">
        {chartData ? (
          <div className="h-80">
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <p className="text-soft text-center py-16">
            Loading chart data...
          </p>
        )}
      </Card>
    </div>
  )
}
