import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { FaTasks } from 'react-icons/fa';
import { FaSignOutAlt } from "react-icons/fa";


const Navbar = () => {
    const { user, logout } = useTasks();

    return (
        <nav className="w-full fixed z-10 bg-gray-800/30 text-white shadow-md backdrop-blur-md backdrop-saturate-150 border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Left: Logo & Brand */}
                    <div className="flex items-center gap-2">
                        <FaTasks className="text-2xl text-blue-800" />
                        <Link to="/" className="text-xl font-semibold hover:text-blue-800 transition">
                            Task Manager
                        </Link>
                    </div>

                    {/* Right: Navigation Links */}
                    <ul className="flex items-center gap-6">
                        {user ? (
                            <>
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-blue-800 transition"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="hover:text-blue-800 transition"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                    >
                                        <FaSignOutAlt />
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="hover:text-blue-800 transition"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="bg-blue-800 hover:bg-blue-900 text-gray-200 px-3 py-1 rounded transition"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
