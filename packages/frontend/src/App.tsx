import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTheme } from './contexts/ThemeContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)
  const { toggleTheme } = useTheme()

  return (
    <>
      <Header onThemeToggle={toggleTheme} />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <div id="hero" className="flex flex-col items-center justify-center min-h-screen p-8">
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

          <p className="text-gray-500 dark:text-gray-400">
            Click on the Vite and React logos to learn more
          </p>
        </div>

        {/* Placeholder sections for navigation */}
        <div id="features" className="min-h-screen flex items-center justify-center p-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Features Section</h2>
        </div>

        <div id="about" className="min-h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">About Section</h2>
        </div>

        <div id="contact" className="min-h-screen flex items-center justify-center p-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Section</h2>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
