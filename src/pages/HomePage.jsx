import { useState } from 'react'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [tripType, setTripType] = useState('oneWay')
  const [departureDate, setDepartureDate] = useState('')

  return (
    <div className="page-container">

      {/* Main content - Flight search form */}
      <div className="content-container">
        <div className="card">
          <h1 className="card-title">Flight Search</h1>
          {/* Flight search form */}
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
            
            {/* One-way card */}
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

            {/* Round-trip card */}
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

            <button className="primary-button w-full mt-4">
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
