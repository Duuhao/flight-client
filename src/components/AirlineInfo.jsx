import React from 'react';
import '../styles/shared.css';

const airlineLogos = {
  'CA': {
    name: 'Air China',
    logo: '/src/assets/images/airlines/Air China.png'
  },
  'MU': {
    name: 'China Eastern', 
    logo: '/src/assets/images/airlines/China Eastern.png'
  },
  'HU': {
    name: 'Hainan Airlines',
    logo: '/src/assets/images/airlines/Hainan Airlines.png'
  },
  'CX': {
    name: 'Cathay Pacific',
    logo: '/src/assets/images/airlines/Cathay Pacific.png'
  },
  'SQ': {
    name: 'Singapore Airlines',
    logo: '/src/assets/images/airlines/Singapore Airlines.png'
  },
  'QF': {
    name: 'Qantas',
    logo: '/src/assets/images/airlines/Qantas.png'
  },
  'EK': {
    name: 'Emirates',
    logo: '/src/assets/images/airlines/Emirates.png'
  },
  'NH': {
    name: 'ANA',
    logo: '/src/assets/images/airlines/ANA.png'
  }
};

export default function AirlineInfo({ flightNumber }) {
  const airlineCode = flightNumber.substring(0, 2);
  const airline = airlineLogos[airlineCode] || {
    name: 'Unknown Airline',
    logo: '/assets/images/default-airline.png'
  };

  return (
    <div className="airlineInfo">
      <img src={airline.logo} alt={airline.name} className="airlineLogo" />
      <span>{airline.name}</span>
    </div>
  );
}
