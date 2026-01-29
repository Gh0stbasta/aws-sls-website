import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const [count, setCount] = useState(0)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="flex gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          Vite + React
        </h1>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-8 shadow-lg">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Edit <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={toggleTheme}
            className="bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-xl flex items-center gap-2"
          >
            {theme === 'light' ? '🌙' : '☀️'}
            Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
