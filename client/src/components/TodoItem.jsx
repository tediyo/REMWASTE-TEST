import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'
import TodoForm from './TodoForm'

const TodoItem = ({ todo, isEditing, onEdit, onCancelEdit, onSaveEdit }) => {
  const { deleteTodo, toggleTodo } = useTodo()
  const [deleting, setDeleting] = useState(false)

  const handleToggle = async () => {
    await toggleTodo(todo.id)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setDeleting(true)
      await deleteTodo(todo.id)
      setDeleting(false)
    }
  }

  if (isEditing) {
    return (
      <TodoForm
        todo={todo}
        onClose={onCancelEdit}
        onSave={onSaveEdit}
      />
    )
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            data-testid={`todo-checkbox-${todo.id}`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-medium ${
              todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={onEdit}
                className="text-gray-400 hover:text-gray-600 text-sm"
                data-testid={`edit-todo-${todo.id}`}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-red-400 hover:text-red-600 text-sm"
                data-testid={`delete-todo-${todo.id}`}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          
          {todo.description && (
            <p className={`mt-2 text-sm ${
              todo.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {todo.description}
            </p>
          )}
          
          <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
            <span>ID: {todo.id}</span>
            <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
            {todo.completed && (
              <span className="text-green-600">✓ Completed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoItem 