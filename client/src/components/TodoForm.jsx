import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

const TodoForm = ({ todo = null, onClose }) => {
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    completed: todo?.completed || false
  })
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { createTodo, updateTodo } = useTodo()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)

    try {
      if (todo) {
        await updateTodo(todo.id, formData)
      } else {
        await createTodo(formData)
      }
      onClose()
    } catch (error) {
      console.error('Error saving todo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {todo ? 'Edit Todo' : 'Add New Todo'}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          data-testid="close-form-button"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="input"
            placeholder="Enter todo title"
            data-testid="todo-title-input"
          />
          {validationErrors.title && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input"
            rows="3"
            placeholder="Enter todo description"
            data-testid="todo-description-input"
          />
        </div>

        <div className="flex items-center">
          <input
            id="completed"
            name="completed"
            type="checkbox"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            data-testid="todo-completed-checkbox"
          />
          <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
            Mark as completed
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            data-testid="save-todo-button"
          >
            {loading ? 'Saving...' : (todo ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm 