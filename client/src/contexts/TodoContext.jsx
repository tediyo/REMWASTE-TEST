import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const TodoContext = createContext()

export const useTodo = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('/api/todos')
      setTodos(response.data.todos)
    } catch (error) {
      setError('Failed to fetch todos')
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async (todoData) => {
    try {
      setError(null)
      const response = await axios.post('/api/todos', todoData)
      setTodos(prev => [...prev, response.data.todo])
      return { success: true, todo: response.data.todo }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create todo'
      setError(message)
      return { success: false, error: message }
    }
  }

  const updateTodo = async (id, todoData) => {
    try {
      setError(null)
      const response = await axios.put(`/api/todos/${id}`, todoData)
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? response.data.todo : todo
        )
      )
      return { success: true, todo: response.data.todo }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update todo'
      setError(message)
      return { success: false, error: message }
    }
  }

  const deleteTodo = async (id) => {
    try {
      setError(null)
      await axios.delete(`/api/todos/${id}`)
      setTodos(prev => prev.filter(todo => todo.id !== id))
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete todo'
      setError(message)
      return { success: false, error: message }
    }
  }

  const toggleTodo = async (id) => {
    try {
      setError(null)
      const response = await axios.patch(`/api/todos/${id}/toggle`)
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? response.data.todo : todo
        )
      )
      return { success: true, todo: response.data.todo }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to toggle todo'
      setError(message)
      return { success: false, error: message }
    }
  }

  const value = {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
} 