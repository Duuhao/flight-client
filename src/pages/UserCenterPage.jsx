import { useState } from 'react';
import styles from '../styles/shared.css';

export default function UserCenterPage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    membership: 'Gold'
  });

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">User Center</h1>
        
        <div className="form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              value={user.phone}
              onChange={(e) => setUser({...user, phone: e.target.value})}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Membership Level</label>
            <input 
              type="text" 
              value={user.membership}
              readOnly
            />
          </div>

          <button className="primary-button">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
