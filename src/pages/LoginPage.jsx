import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../services/http';
import styles from '../styles/shared.css';

export default function LoginPage({ setIsLoggedIn, setUsername: setGlobalUsername }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post('/auth/login', {
        username,
        password
      });
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', response.username);
      setIsLoggedIn(true);
      setGlobalUsername(response.username);
      navigate('/');
    } catch (err) {
      setError('Login failed, please check your username and password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">User Login</h1>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          
          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
        
        <div className="link-text">
          Don't have an account? <a href="/register">Register now</a>
        </div>
      </div>
    </div>
  );
}
