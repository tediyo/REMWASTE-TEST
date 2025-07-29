import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'
import TodoItem from './TodoItem'

const TodoList = ({ todos }) => {
  const [editingTodo, setEditingTodo] = useState(null)

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No todos yet</div>
        <p className="text-gray-400 mt-2">Create your first todo to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingTodo?.id === todo.id}
          onEdit={() => setEditingTodo(todo)}
          onCancelEdit={() => setEditingTodo(null)}
          onSaveEdit={() => setEditingTodo(null)}
        />
      ))}
    </div>
  )
}

export default TodoList 