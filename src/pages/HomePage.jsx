import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../services/http';

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [tripType, setTripType] = useState('oneWay');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cities, setCities] = useState([]);
  const [departureInput, setDepartureInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [departureCity, setDepartureCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await http.get('/flights/cities');
        setCities(response);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };
    fetchCities();
  }, []);

  const filterCities = (input, cities) => {
    if (!input) return [];
    return cities.filter(city => 
      city.name.toLowerCase().includes(input.toLowerCase()) ||
      city.code.toLowerCase().includes(input.toLowerCase())
    );
  };

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
              <div className="relative">
                <input
                  type="text"
                  value={departureInput}
                  onChange={(e) => {
                    setDepartureInput(e.target.value);
                    setFilteredDepartures(filterCities(e.target.value, cities));
                    if (!e.target.value) {
                      setDepartureCity(null);
                    }
                  }}
                  placeholder="Enter departure city"
                  required
                />
                {filteredDepartures.length > 0 && (
                  <ul className="dropdown-list">
                    {filteredDepartures.map((city) => (
                      <li 
                        key={city.code}
                        className="dropdown-item"
                        onClick={() => {
                          setDepartureCity(city);
                          setDepartureInput(`${city.name}(${city.code})`);
                          setFilteredDepartures([]);
                        }}
                      >
                        {city.name} ({city.code})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Destination*</label>
              <div className="relative">
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => {
                    setDestinationInput(e.target.value);
                    setFilteredDestinations(filterCities(e.target.value, cities));
                    if (!e.target.value) {
                      setDestinationCity(null);
                    }
                  }}
                  placeholder="Enter arrival city"
                  required
                />
                {filteredDestinations.length > 0 && (
                  <ul className="dropdown-list">
                    {filteredDestinations.map((city) => (
                      <li 
                        key={city.code}
                        className="dropdown-item"
                        onClick={() => {
                          setDestinationCity(city);
                          setDestinationInput(`${city.name}(${city.code})`);
                          setFilteredDestinations([]);
                        }}
                      >
                        {city.name} ({city.code})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
                    id="returnDate"
                    type="date"
                    min={departureDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setReturnDate(e.target.value)}
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
              onClick={async () => {
                if (!departureCity || !destinationCity || !departureDate) {
                  alert('Please fill all required fields');
                  return;
                }

                // 单程直接跳转
                if (tripType === 'oneWay') {
                  navigate('/flights', {
                    state: {
                      tripType,
                      outbound: {
                        departureCode: departureCity.code,
                        destinationCode: destinationCity.code,
                        date: departureDate
                      },
                      passengers
                    }
                  });
                  return;
                }

                // 往返需要获取返程日期
                if (!returnDate) {
                  alert('Please select return date');
                  return;
                }

                navigate('/flights', {
                  state: {
                    tripType,
                    outbound: {
                      departureCode: departureCity.code,
                      destinationCode: destinationCity.code,
                      date: departureDate
                    },
                    inbound: {
                      departureCode: destinationCity.code,
                      destinationCode: departureCity.code,
                      date: returnDate
                    },
                    passengers
                  }
                });
              }}
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
