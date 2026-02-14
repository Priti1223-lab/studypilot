import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'
import ThemeSwitcher from '../common/ThemeSwitcher'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="bg-card border-b border-borderc px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo + Name */}
        <div className="flex items-center gap-3 select-none">
          <img
            src={logo}
            alt="StudyPilot"
            className="h-9 w-auto object-contain drop-shadow-md"
          />
          <h1 className="text-xl font-bold text-accent tracking-wide">
            StudyPilot
          </h1>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">

          <ThemeSwitcher />

          <span className="text-sm text-textc hidden md:block">
            {user?.email}
          </span>

          <Button onClick={handleSignOut} variant="secondary">
            Sign Out
          </Button>

        </div>
      </div>
    </nav>
  )
}

