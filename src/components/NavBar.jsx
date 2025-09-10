import { Link } from 'react-router-dom';
import { Airplane } from '@icon-park/react';

export default function NavBar({ isLoggedIn, username }) {
  return (
    <nav className="flex justify-between items-center bg-white shadow-sm p-4">
      <Link to="/" className="flex items-center hover:opacity-80 transition" style={{color: 'inherit', textDecoration: 'none'}}>
        <Airplane theme="outline" size="32" fill="#3b82f6" style={{marginRight: '0.75rem'}} />
        <span className="text-2xl font-black italic text-primary-dark font-serif" style={{fontWeight: 900}}>StarFlight Booking</span>
      </Link>
      
      {isLoggedIn ? (
        <div className="flex gap-6">
          <span className="text-gray-dark" style={{marginRight: '1rem'}}>Welcome, </span>
          <Link to="/user" className="text-gray-dark hover:text-primary" style={{marginRight: '1rem'}}>
            {username}
          </Link>
          <Link to="/my-trips" className="nav-link" style={{marginRight: '1rem'}}>My Trips</Link>
          <span
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('username');
              window.location.href = '/';
            }}
            className="nav-link text-red-500 hover:text-red-700 cursor-pointer"
            style={{marginRight: '1rem'}}
          >
            Sign Out
          </span>
        </div>
      ) : (
        <div className="flex gap-8">
          <Link to="/login" className="nav-link" style={{marginRight: '1rem'}}>Login</Link>
          <Link to="/register" className="link-primary" style={{marginRight: '1rem'}}>Register Now</Link>
        </div>
      )}
    </nav>
  );
}
