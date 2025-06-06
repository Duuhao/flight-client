import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/shared.css?inline';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, returnFlight, passengers: initialPassengers = 1 } = location.state || {};
  console.log('Booking page received:', { flight, returnFlight });
  const [passengers, setPassengers] = useState(initialPassengers);
  const [outboundCabinClass, setOutboundCabinClass] = useState('economy');
  const [returnCabinClass, setReturnCabinClass] = useState('economy');

  if (!flight) {
    return <div className="page-container">
      <div className="card">
        <h1 className="card-title">No flight selected</h1>
        <button className="primary-button" onClick={() => navigate('/flights')}>
          Back to Flights
        </button>
      </div>
    </div>;
  }

  const totalPrice = () => {
    const outboundPrice = outboundCabinClass === 'economy' 
      ? flight.economyPrice 
      : flight.businessPrice;
    const returnPrice = returnFlight 
      ? (returnCabinClass === 'economy' 
        ? returnFlight.economyPrice 
        : returnFlight.businessPrice)
      : 0;
    return (outboundPrice + returnPrice + 350) * passengers;
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">Flight Booking</h1>
        
        <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
          <div className="flight-details" style={{flex: 1}}>
            <h2>Outbound Flight</h2>
            <div className="detail-row">
              <span>Flight:</span>
              <span>{flight.airline} {flight.flightNumber}</span>
            </div>
            <div className="detail-row">
              <span>Route:</span>
              <span>{flight.departure} → {flight.arrival}</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span>{
                flight.date && !isNaN(new Date(flight.date)) 
                  ? new Date(flight.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      weekday: 'short'
                    })
                  : flight.date || 'N/A'
              }</span>
            </div>
            <div className="detail-row">
              <span>Time:</span>
              <span>{flight.time.departure} - {flight.time.arrival}</span>
            </div>
          </div>

          {returnFlight && (
            <div className="flight-details" style={{flex: 1}}>
              <h2>Return Flight</h2>
              <div className="detail-row">
                <span>Flight:</span>
                <span>{returnFlight.airline} {returnFlight.flightNumber}</span>
              </div>
              <div className="detail-row">
                <span>Route:</span>
                <span>{returnFlight.departure} → {returnFlight.arrival}</span>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <span>{
                  returnFlight.date && !isNaN(new Date(returnFlight.date))
                    ? new Date(returnFlight.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric',
                        weekday: 'short'
                      })
                    : returnFlight.date || 'N/A'
                }</span>
              </div>
              <div className="detail-row">
                <span>Time:</span>
                <span>{returnFlight.time.departure} - {returnFlight.time.arrival}</span>
              </div>
            </div>
          )}
        </div>

        <div className="booking-options">
          <h2>Booking Options</h2>
          <div className="form-group">
            <label>Outbound Cabin Class:</label>
            <select 
              value={outboundCabinClass}
              onChange={(e) => setOutboundCabinClass(e.target.value)}
              className="form-control"
            >
              <option value="economy">Economy (¥{flight.economyPrice})</option>
              <option value="business">Business (¥{flight.businessPrice})</option>
            </select>
          </div>

          {returnFlight && (
            <div className="form-group">
              <label>Return Cabin Class:</label>
              <select 
                value={returnCabinClass}
                onChange={(e) => setReturnCabinClass(e.target.value)}
                className="form-control"
              >
                <option value="economy">Economy (¥{returnFlight.economyPrice})</option>
                <option value="business">Business (¥{returnFlight.businessPrice})</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Passengers:</label>
            <div className="passenger-selector">
              <button 
                type="button"
                className="quantity-btn"
                onClick={() => setPassengers(prev => Math.max(1, prev - 1))}
                disabled={passengers <= 1}
              >
                -
              </button>
              <span className="passenger-count">{passengers}</span>
              <button 
                type="button"
                className="quantity-btn"
                onClick={() => setPassengers(prev => Math.min(10, prev + 1))}
                disabled={passengers >= 10}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="price-summary">
          <h2>Price Summary</h2>
          
          <div className="flight-price-section">
            <h3>Outbound Flight</h3>
            <div className="detail-row">
              <span>Base Price:</span>
              <span>¥{outboundCabinClass === 'economy' ? flight.economyPrice : flight.businessPrice}</span>
            </div>
            <div className="detail-row">
              <span>Tax:</span>
              <span>¥200</span>
            </div>
            <div className="detail-row">
              <span>Fuel Surcharge:</span>
              <span>¥150</span>
            </div>
            <div className="detail-row subtotal">
              <span>Subtotal:</span>
              <span>¥{(outboundCabinClass === 'economy' ? flight.economyPrice : flight.businessPrice) + 350}</span>
            </div>
          </div>

          {returnFlight && (
            <div className="flight-price-section">
              <h3>Return Flight</h3>
              <div className="detail-row">
                <span>Base Price:</span>
                <span>¥{returnCabinClass === 'economy' ? returnFlight.economyPrice : returnFlight.businessPrice}</span>
              </div>
              <div className="detail-row">
                <span>Tax:</span>
                <span>¥200</span>
              </div>
              <div className="detail-row">
                <span>Fuel Surcharge:</span>
                <span>¥150</span>
              </div>
              <div className="detail-row subtotal">
                <span>Subtotal:</span>
                <span>¥{(returnCabinClass === 'economy' ? returnFlight.economyPrice : returnFlight.businessPrice) + 350}</span>
              </div>
            </div>
          )}

          <div className="detail-row">
            <span>Passengers:</span>
            <span>{passengers}</span>
          </div>
          <div className="detail-row grand-total">
            <span>Total:</span>
            <span>¥{totalPrice()}</span>
          </div>
        </div>

        <div className="button-group">
          <button 
            className="secondary-button"
            onClick={() => navigate(-1)}
          >
            Back to Flights
          </button>
          <button 
            className="primary-button"
            onClick={() => navigate('/payment', { 
              state: { 
                flight,
                returnFlight,
                passengers, 
                outboundCabinClass,
                returnCabinClass,
                totalPrice: totalPrice() 
              } 
            })}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
