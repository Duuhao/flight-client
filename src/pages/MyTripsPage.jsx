import { useState } from 'react';
import '../styles/shared.css';
import AirlineInfo from '../components/AirlineInfo';

export default function MyTripsPage() {
  const [trips] = useState([
    {
      id: 1,
      flight: 'CA123',
      airline: 'Air China',
      from: 'Beijing',
      to: 'Shanghai',
      date: '2025-06-15',
      type: 'Upcoming'
    },
    {
      id: 2,
      flight: 'MU456',
      airline: 'China Eastern',
      from: 'Shanghai',
      to: 'Tokyo',
      date: '2025-05-20',
      type: 'Completed'
    },
    {
      id: 3,
      flight: 'HU789',
      airline: 'Hainan Airlines',
      from: 'Guangzhou',
      to: 'Sydney',
      date: '2025-07-10',
      type: 'Upcoming'
    },
    {
      id: 4,
      flight: 'HU101',
      airline: 'Hainan Airlines',
      from: 'Chengdu',
      to: 'Lhasa',
      date: '2025-04-15',
      type: 'Completed'
    }
  ]);

  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [showMoreCompleted, setShowMoreCompleted] = useState(false);

  const upcomingTrips = trips.filter(trip => trip.type === 'Upcoming');
  const completedTrips = trips.filter(trip => trip.type === 'Completed');

  const earliestUpcoming = upcomingTrips.length > 0 
    ? upcomingTrips.reduce((earliest, current) => 
        new Date(current.date) < new Date(earliest.date) ? current : earliest)
    : null;

  const latestCompleted = completedTrips.length > 0
    ? completedTrips.reduce((latest, current) => 
        new Date(current.date) > new Date(latest.date) ? current : latest)
    : null;

  return (
    <div className="page-container">
      <div className="card" style={{width: '800px'}}>
        <h1 className="card-title">My Trips</h1>
        
        <div className="StandardList">
          <div className="section-header">
            <h2>Upcoming Trips</h2>
            {upcomingTrips.length > 1 && (
              <button 
                className="show-more-button"
                onClick={() => setShowMoreUpcoming(!showMoreUpcoming)}
              >
                {showMoreUpcoming ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>

          {earliestUpcoming && (
            <div key={earliestUpcoming.id} className="flightItem" style={{display: 'flex', alignItems: 'center'}}>
              <div style={{minWidth: '180px'}}>
                <AirlineInfo flightNumber={earliestUpcoming.flight} style={{textAlign: 'left'}}/>
              </div>
              <div style={{minWidth: '80px'}}>
                {earliestUpcoming.flight}
              </div>
              <div className="flightRoute" style={{flex: 1}}>
                <span>{earliestUpcoming.from}</span>
                <span>→</span>
                <span>{earliestUpcoming.to}</span>
              </div>
              <div className="flightTime" style={{minWidth: '120px'}}>
                {earliestUpcoming.date}
              </div>
            </div>
          )}

          {showMoreUpcoming && upcomingTrips
            .filter(trip => trip.id !== earliestUpcoming?.id)
            .map(trip => (
              <div key={trip.id} className="flightItem" style={{display: 'flex', alignItems: 'center'}}>
                <div style={{minWidth: '180px'}}>
                  <AirlineInfo flightNumber={trip.flight} style={{textAlign: 'left'}}/>
                </div>
                <div style={{minWidth: '80px'}}>
                  {trip.flight}
                </div>
                <div className="flightRoute" style={{flex: 1}}>
                  <span>{trip.from}</span>
                  <span>→</span>
                  <span>{trip.to}</span>
                </div>
                <div className="flightTime" style={{minWidth: '120px'}}>
                  {trip.date}
                </div>
              </div>
            ))}

          <div className="section-header">
            <h2>Completed Trips</h2>
            {completedTrips.length > 1 && (
              <button 
                className="show-more-button"
                onClick={() => setShowMoreCompleted(!showMoreCompleted)}
              >
                {showMoreCompleted ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>

          {latestCompleted && (
            <div key={latestCompleted.id} className="flightItem" style={{display: 'flex', alignItems: 'center'}}>
              <div style={{minWidth: '180px'}}>
                <AirlineInfo flightNumber={latestCompleted.flight} style={{textAlign: 'left'}}/>
              </div>
              <div style={{minWidth: '80px'}}>
                {latestCompleted.flight}
              </div>
              <div className="flightRoute" style={{flex: 1}}>
                <span>{latestCompleted.from}</span>
                <span>→</span>
                <span>{latestCompleted.to}</span>
              </div>
              <div className="flightTime" style={{minWidth: '120px'}}>
                {latestCompleted.date}
              </div>
            </div>
          )}

          {showMoreCompleted && completedTrips
            .filter(trip => trip.id !== latestCompleted?.id)
            .map(trip => (
              <div key={trip.id} className="flightItem" style={{display: 'flex', alignItems: 'center'}}>
                <div style={{minWidth: '180px'}}>
                  <AirlineInfo flightNumber={trip.flight} style={{textAlign: 'left'}}/>
                </div>
                <div style={{minWidth: '80px'}}>
                  {trip.flight}
                </div>
                <div className="flightRoute" style={{flex: 1}}>
                  <span>{trip.from}</span>
                  <span>→</span>
                  <span>{trip.to}</span>
                </div>
                <div className="flightTime" style={{minWidth: '120px'}}>
                  {trip.date}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
