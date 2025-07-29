import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Todo App
            </h1>
            <span className="text-sm text-gray-500">
              Automated Testing Demo
            </span>
          </div>
          
          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.username}!
              </span>
              <button
                onClick={logout}
                className="btn btn-secondary"
                data-testid="logout-button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 