import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/user/register', { name, email, password });
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-md backdrop-blur-md backdrop-saturate-150 border-b border-white/20 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />
                    <button type="submit"
                        className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md transition duration-300"

                    >Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;