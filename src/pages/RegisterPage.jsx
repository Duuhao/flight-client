import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }
    
    // 测试账号注册
    if(formData.email === 'test@test.com') {
      alert('Registration successful! Please login')
      window.location.href = '/login'
      return
    }

    // TODO: 调用注册API
    console.log('Registration request:', formData)
      alert('Registration successful! Please login')
    window.location.href = '/login'
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="card">
          <h1 className="card-title">Create Account</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="primary-button">
              Register
            </button>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/login" className="link">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
