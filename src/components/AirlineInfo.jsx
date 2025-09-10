import React from 'react';
import '../styles/shared.css';
import airlineNameMap from '../config/airlines.json';

// 使用Vite的import.meta.glob批量导入航空公司logo
const airlineImages = import.meta.glob('../assets/images/airlines/*.png', { eager: true });

const airlineLogos = Object.fromEntries(
  Object.entries(airlineNameMap).map(([code, name]) => {
    const fileName = `${name}.png`;
    const logoPath = `../assets/images/airlines/${fileName}`;
    return [
      code,
      {
        name,
        logo: airlineImages[logoPath]?.default
      }
    ];
  })
);

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
