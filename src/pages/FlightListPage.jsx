import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AirlineInfo from '../components/AirlineInfo';
import { searchFlights } from '../services/http';

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
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const { outbound, inbound } = location.state;
        
        // 获取去程航班
        // 格式化航班数据
        const formatFlightData = (flights) => {
          return flights.map(flight => ({
            ...flight,
            departure: flight.departureCity ? `${flight.departureCity} (${flight.departureAirport})` : flight.departureAirport,
            arrival: flight.arrivalCity ? `${flight.arrivalCity} (${flight.arrivalAirport})` : flight.arrivalAirport,
            time: {
              departure: new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              arrival: new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              isNextDay: new Date(flight.arrivalTime).getDate() !== new Date(flight.departureTime).getDate()
            }
          }));
        };

        let outboundFlights = await searchFlights(
          outbound.departureCode,
          outbound.destinationCode,
          outbound.date
        );
        outboundFlights = formatFlightData(outboundFlights);

        if (location.state.tripType === 'roundTrip') {
          // 如果是往返，获取返程航班
          let inboundFlights = await searchFlights(
            inbound.departureCode,
            inbound.destinationCode,
            inbound.date
          );
          inboundFlights = formatFlightData(inboundFlights);
          setFlights({
            outbound: outboundFlights,
            inbound: inboundFlights
          });
        } else {
          setFlights({
            outbound: outboundFlights,
            inbound: null
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location.state]);

  return (
    <div className="page-container">
      <div className="listCard">
        <h1 className="card-title">
          {tripType === 'roundTrip' && outboundFlight 
            ? 'Select Return Flight' 
            : 'Flight List'}
        </h1>
        
        {location.state?.outbound?.date && (
          <div className="search-date-info">
            <h3>
              {tripType === 'roundTrip' 
                ? `Departure: ${location.state.outbound.date} | Return: ${location.state.inbound.date}`
                : `Date: ${location.state.outbound.date}`}
            </h3>
          </div>
        )}
        
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
          {loading ? (
            <div>Loading flights...</div>
          ) : error ? (
            <div className="error">Error loading flights: {error}</div>
          ) : (
            (outboundFlight && tripType === 'roundTrip' 
              ? flights.inbound 
              : flights.outbound
            )
            ?.slice(0, displayCount)
            ?.sort((a, b) => {
              if (sortBy === 'price') {
                return (cabinClass === 'economy' 
                  ? a.economyPrice - b.economyPrice 
                  : a.businessPrice - b.businessPrice);
              } else {
                return a.departureTime.localeCompare(b.departureTime);
              }
            })
            )?.map(flight => (
            <div key={flight.id} className="flightItem" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              <div style={{width: '180px'}}>
                <AirlineInfo flightNumber={flight.flightNumber} />
              </div>
              <div style={{width: '80px', textAlign: 'center', marginLeft: '-10px'}}>
                {flight.flightNumber}
              </div>
              <div style={{width: '280px', display: 'flex', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap'}}>
                <span>{flight.departure}</span>
                <span>→</span>
                <span>{flight.arrival}</span>
              </div>
              <div style={{width: '180px', textAlign: 'center'}}>
                <div>
                  {flight.time.departure} → 
                  {flight.time.arrival}
                  {flight.time.isNextDay && <span style={{color: 'red'}}>+1</span>}
                </div>
              </div>
              <div style={{width: '120px', textAlign: 'center'}}>
                ¥{cabinClass === 'economy' ? flight.economyPrice : flight.businessPrice}
              </div>
              <div style={{width: '100px'}}>
                <button 
                  className="listButton"
                  onClick={() => {
                    if (tripType === 'roundTrip' && !outboundFlight) {
                      setOutboundFlight(flight);
                    } else {
                      navigate('/booking', { 
                        state: { 
                          flight: {
                            ...(tripType === 'roundTrip' ? outboundFlight : flight),
                            date: tripType === 'roundTrip' 
                              ? location.state.outbound.date 
                              : location.state.outbound.date
                          },
                          returnFlight: tripType === 'roundTrip' ? {
                            ...flight,
                            date: location.state.inbound.date
                          } : null,
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
