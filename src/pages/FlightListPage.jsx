import { useState } from 'react'
import styles from './FlightListPage.module.css'

export default function FlightListPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cabinClass, setCabinClass] = useState('economy');
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
        flightNo: `${flightPrefix}${1000 + i}`,
        departure,
        arrival,
        date: `2025-06-${String(Math.floor(i/5) + 1).padStart(2, '0')}`,
        time: `${6 + i % 12}:${i % 2 === 0 ? '00' : '30'}`,
        economyPrice: 500 + Math.floor(Math.random() * 1000),
        businessPrice: 1500 + Math.floor(Math.random() * 2000)
      };
    });
  });

  return (
    <div className="page-container">
      
      <div className={styles.flightCard}>
        <h1 className="card-title">Flight List</h1>
        
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${cabinClass === 'economy' ? styles.active : ''}`}
            onClick={() => setCabinClass('economy')}
          >
            Economy
          </button>
          <button
            className={`${styles.tabButton} ${cabinClass === 'business' ? styles.active : ''}`}
            onClick={() => setCabinClass('business')}
          >
            Business
          </button>
        </div>

        <div className={styles.flightList}>
          {flights.slice(0, displayCount).map(flight => (
            <div key={flight.id} className={styles.flightItem}>
              <div className={styles.airlineInfo}>
                <img 
                  src={`/src/assets/images/airlines/${
                    flight.airline === 'Air China' ? 'air-china' : flight.airline.replace(/\s+/g, ' ')
                  }.png`}
                  alt={flight.airline}
                  className={styles.airlineLogo}
                  width="24"
                  height="24"
                />
                {flight.airline}
              </div>
              <div className={styles.flightNumber}>{flight.flightNo}</div>
              <div className={styles.flightRoute}>
                <span>{flight.departure}</span>
                <span>→</span>
                <span>{flight.arrival}</span>
              </div>
              <div className={styles.flightTime}>{flight.date} {flight.time}</div>
              <div className={styles.flightPrice}>
                ¥{cabinClass === 'economy' ? flight.economyPrice : flight.businessPrice}
              </div>
              <button className={styles.bookButton}>Book</button>
            </div>
          ))}
        </div>

        {displayCount < flights.length && (
          <div className={styles.loadMoreContainer}>
            <button 
              onClick={() => setDisplayCount(prev => Math.min(prev + 10, flights.length))}
              className={styles.loadMoreButton}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
