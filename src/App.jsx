import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import QMSChatbot from './pages/QMSChatbot'
import TeamTracker from './pages/TeamTracker'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qms-chatbot" element={<QMSChatbot />} />
          <Route path="/team-tracker" element={<TeamTracker />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
