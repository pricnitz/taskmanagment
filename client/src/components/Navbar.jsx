import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Task Manager
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/user" className="text-gray-300 hover:text-white">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;