import { useTheme } from './contexts/ThemeContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { QuickStartSection } from './sections/QuickStartSection'
import { CodeExamplesSection } from './sections/CodeExamplesSection'
import { ArchitectureSection } from './sections/ArchitectureSection'
import { heroData } from './data/hero'

function App() {
  const { toggleTheme } = useTheme()

  return (
    <>
      <Header onThemeToggle={toggleTheme} />
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <HeroSection {...heroData} />
        <ArchitectureSection />

        <QuickStartSection />

        <CodeExamplesSection />

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
