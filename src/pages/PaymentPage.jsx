import { useNavigate } from 'react-router-dom';
import styles from '../styles/shared.css?inline';

export default function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">Payment Successful</h1>
        <p>Your payment has been processed successfully.</p>
        
        <div className="button-group" style={{marginTop: '32px'}}>
          <button 
            className="primary-button"
            onClick={() => navigate(-1)}
          >
            Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}
