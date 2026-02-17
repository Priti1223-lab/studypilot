import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Input from '../common/Input'
import Button from '../common/Button'
import { supabase } from '../../lib/supabaseClient'

export default function Login({ onToggle }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  // ⭐ PASSWORD RESET FUNCTION
  const handleResetPassword = async () => {
    if (!email) {
      setError("Pehle email enter karo")
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password"
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Password reset link email par bhej diya gaya 📩")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
            <span className="text-textc font-bold text-3xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-textc mb-2">Welcome Back</h1>
          <p className="text-soft">Sign in to continue your NEET journey</p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <form onSubmit={handleSubmit}>

            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-green-900/20 border border-green-500 rounded-lg text-green-400 text-sm">
                {message}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* 🔥 FORGOT PASSWORD */}
          <div className="text-right mt-3">
            <button
              onClick={handleResetPassword}
              className="text-sm text-accent hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-soft">
              Don't have an account?{' '}
              <button
                onClick={onToggle}
                className="text-primary hover:text-primary-hover font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
