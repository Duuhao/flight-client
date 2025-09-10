import { useState, useEffect } from 'react';
import styles from '../styles/shared.css';
import { getUserInfo } from '../services/http';

export default function UserCenterPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="card">
          <h1 className="card-title">User Center</h1>
          <div>Loading user information...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="card">
          <h1 className="card-title">User Center</h1>
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">User Center</h1>
        
        <div className="info-display">
          <div className="info-item">
            <span className="info-label">Username:</span>
            <span className="info-value">{user.username}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Membership Level:</span>
            <span className="info-value">{user.membershipName || 'Standard'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
