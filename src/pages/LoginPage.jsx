import NavBar from '../components/NavBar'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 测试账号
    if(email === 'test@test.com' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', 'Test User')
      setIsLoggedIn(true)
      setUsername('Test User')
      window.location.href = '/'
      return
    }

    try {
      // TODO: 调用登录API
      console.log('Login request:', { email, password, rememberMe })
      setError('')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="page-container">
      
      <div className="content-container">
        <div className="card">
          <h1 className="card-title">User Login</h1>
          
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="rememberMe">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="rememberMe"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <button type="submit" className="primary-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
