import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

const Dashboard = () => {
  const { todos, loading, error } = useTodo()
  const [showForm, setShowForm] = useState(false)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading todos...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <p className="text-gray-600 mt-2">
            Manage your tasks and stay organized
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
          data-testid="add-todo-button"
        >
          Add Todo
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-6">
          <TodoForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <TodoList todos={todos} />
    </div>
  )
}

export default Dashboard 