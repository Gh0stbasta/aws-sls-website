import { motion } from 'framer-motion'
import { useTheme } from './contexts/ThemeContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { heroData } from './data/hero'
import { fadeInUp } from './animations/variants'

function App() {
  const { toggleTheme } = useTheme()

  return (
    <>
      <Header onThemeToggle={toggleTheme} />
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <HeroSection {...heroData} />

        {/* Placeholder sections for navigation */}
        <motion.div 
          id="quick-start" 
          className="min-h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Quick Start Section</h2>
        </motion.div>

        <motion.div 
          id="features" 
          className="min-h-screen flex items-center justify-center p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Features Section</h2>
        </motion.div>

        <motion.div 
          id="about" 
          className="min-h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">About Section</h2>
        </motion.div>

        <motion.div 
          id="contact" 
          className="min-h-screen flex items-center justify-center p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Section</h2>
        </motion.div>
      </div>
      <Footer />
    </>
  )
}

export default App
