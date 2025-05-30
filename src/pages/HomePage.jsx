import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [tripType, setTripType] = useState('oneWay');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="card">
          <h1 className="card-title">Flight Search</h1>
          <div className="form">
            <div className="tab-container">
              <button
                className={`tab-button ${tripType === 'oneWay' ? 'active' : ''}`}
                onClick={() => setTripType('oneWay')}
              >
                One Way
              </button>
              <button
                className={`tab-button ${tripType === 'roundTrip' ? 'active' : ''}`}
                onClick={() => setTripType('roundTrip')}
              >
                Round Trip
              </button>
            </div>

            <div className="form-group">
              <label>Departure*</label>
              <input 
                type="text"
                placeholder="Enter departure city"
                required
              />
            </div>
            <div className="form-group">
              <label>Destination*</label>
              <input 
                type="text"
                placeholder="Enter arrival city"
                required
              />
            </div>

            {tripType === 'oneWay' && (
              <div className="form-group">
                <label>Departure Date*</label>
                <input 
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
              </div>
            )}

            {tripType === 'roundTrip' && (
              <div className="formRow">
                <div className="form-group">
                  <label>Departure Date*</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Return Date*</label>
                  <input 
                    type="date"
                    min={departureDate || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Passengers</label>
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

            <button 
              className="primary-button w-full mt-4"
              onClick={() => navigate('/flights', { 
                state: { 
                  departureDate,
                  tripType,
                  passengers
                } 
              })}
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
