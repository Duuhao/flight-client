import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserCenterPage from './pages/UserCenterPage'
import MyTripsPage from './pages/MyTripsPage'
import MyBookingsPage from './pages/MyBookingsPage'
import FlightListPage from './pages/FlightListPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || ''
  })

  return (
    <Router>
      <div className="app-container">
        <NavBar isLoggedIn={isLoggedIn} username={username} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/login" 
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} 
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/flights" element={<FlightListPage />} />
            <Route path="/user" element={<UserCenterPage />} />
            <Route path="/my-trips" element={<MyTripsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
