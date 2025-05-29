import styles from '../styles/shared.css';

export default function UserCenterPage() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    membership: 'Gold'
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">User Center</h1>
        
        <div className="info-display">
          <div className="info-item">
            <span className="info-label">Full Name:</span>
            <span className="info-value">{user.name}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Phone Number:</span>
            <span className="info-value">{user.phone}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Membership Level:</span>
            <span className="info-value">{user.membership}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
