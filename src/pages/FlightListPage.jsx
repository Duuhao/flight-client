import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AirlineInfo from '../components/AirlineInfo';

export default function FlightListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [outboundFlight, setOutboundFlight] = useState(null);
  const { tripType, passengers } = location.state || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cabinClass, setCabinClass] = useState('economy');
  const [sortBy, setSortBy] = useState('price');
  const [displayCount, setDisplayCount] = useState(10);
  const [flights] = useState(() => {
    const airlines = ['Air China', 'China Eastern', 'Hainan Airlines', 'Cathay Pacific', 'Singapore Airlines', 'Qantas', 'Emirates', 'ANA'];
    const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hong Kong', 'Tokyo', 'Seoul', 'Singapore', 'Sydney', 'Dubai'];
    
    return Array.from({length: 25}, (_, i) => {
      const airline = airlines[i % airlines.length];
      const flightPrefix = {
        'Air China': 'CA',
        'China Eastern': 'MU',
        'Hainan Airlines': 'HU',
        'Cathay Pacific': 'CX',
        'Singapore Airlines': 'SQ',
        'Qantas': 'QF',
        'Emirates': 'EK',
        'ANA': 'NH'
      }[airline];
      
      const departure = cities[i % cities.length];
      let arrival = cities[(i + 1) % cities.length];
      while (arrival === departure) {
        arrival = cities[(i + 2) % cities.length];
      }
      
      return {
        id: i + 1,
        airline,
        flightNumber: `${flightPrefix}${1000 + i}`,
        departure,
        arrival,
        date: `2025-06-${String(Math.floor(i/5) + 1).padStart(2, '0')}`,
        time: {
          departure: `${6 + i % 12}:${i % 2 === 0 ? '00' : '30'}`,
          arrival: `${6 + (i + 2) % 12}:${i % 2 === 0 ? '30' : '00'}`,
          isNextDay: (6 + (i + 2) % 12) < (6 + i % 12)
        },
        economyPrice: 500 + Math.floor(Math.random() * 1000),
        businessPrice: 1500 + Math.floor(Math.random() * 2000)
      };
    });
  });

  return (
    <div className="page-container">
      <div className="listCard">
        <h1 className="card-title">
          {tripType === 'roundTrip' && outboundFlight 
            ? 'Select Return Flight' 
            : 'Flight List'}
        </h1>
        
        <div className="tab-container">
          <button
            className={`tab-button ${cabinClass === 'economy' ? 'active' : ''}`}
            onClick={() => setCabinClass('economy')}
          >
            Economy
          </button>
          <button
            className={`tab-button ${cabinClass === 'business' ? 'active' : ''}`}
            onClick={() => setCabinClass('business')}
          >
            Business
          </button>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', justifyContent: 'flex-end', width: '100%'}}>
          <span>Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: '#fff'
            }}
          >
            <option value="price">Price</option>
            <option value="time">Time</option>
          </select>
        </div>

        <div className="StandardList">
          {flights
            .slice(0, displayCount)
            .sort((a, b) => {
              if (sortBy === 'price') {
                return (cabinClass === 'economy' 
                  ? a.economyPrice - b.economyPrice 
                  : a.businessPrice - b.businessPrice);
              } else {
                return a.time.departure.localeCompare(b.time.departure);
              }
            })
            .map(flight => (
            <div key={flight.id} className="flightItem" style={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <div style={{minWidth: '180px'}}>
                <AirlineInfo flightNumber={flight.flightNumber} />
              </div>
              <div style={{minWidth: '80px'}}>
                {flight.flightNumber}
              </div>
              <div style={{minWidth: '200px', flex: 1, display: 'flex', justifyContent: 'center', gap: '8px'}}>
                <span>{flight.departure}</span>
                <span>→</span>
                <span>{flight.arrival}</span>
              </div>
              <div style={{minWidth: '150px'}}>
                {flight.time.departure} → 
                {flight.time.arrival}
                {flight.time.isNextDay && <span style={{color: 'red'}}>+1</span>}
              </div>
              <div style={{minWidth: '100px'}}>
                ¥{cabinClass === 'economy' ? flight.economyPrice : flight.businessPrice}
              </div>
              <div style={{minWidth: '100px'}}>
                <button 
                  className="listButton"
                  onClick={() => {
                    if (tripType === 'roundTrip' && !outboundFlight) {
                      setOutboundFlight(flight);
                    } else {
                      navigate('/booking', { 
                        state: { 
                          flight: tripType === 'roundTrip' ? outboundFlight : flight,
                          returnFlight: tripType === 'roundTrip' ? flight : null,
                          cabinClass,
                          passengers
                        }
                      });
                    }
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {displayCount < flights.length && (
          <div className="loadMoreContainer">
            <button 
              onClick={() => setDisplayCount(prev => Math.min(prev + 10, flights.length))}
              className="listButton"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
