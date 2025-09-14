import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import api from '../api/api';

const ProfilePage = () => {
    const { user, loading, fetchTasks, logout } = useTasks();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    if (loading) {
        return <div className="text-center text-white text-lg mt-10">Loading profile...</div>;
    }

    if (!user) {
        return <div className="text-center text-red-500 text-lg mt-10">You must be logged in to view this page.</div>;
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/user/update', { name, email });
            alert(res.data.message);
            fetchTasks(); // Optionally refresh user data
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update profile.');
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/user/update-password', { currentPassword, newPassword });
            alert(res.data.message);
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update password.');
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-start text-white  p-8">
            <div className="w-full max-w-7xl grid md:grid-cols-3 grid-cols-1 gap-3 ">
                <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg space-y-8">
                    <h2 className="text-3xl font-semibold mb-4">User Profile</h2>
                    <div className="space-y-2 text-gray-200">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Tasks Assigned:</strong> {user.tasksCount || 'Not available'}</p>
                    </div>
                </div>

                <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg space-y-8">
                    <h3 className="text-xl font-semibold mb-3">Update Profile Information</h3>
                    <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="New Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="email"
                            placeholder="New Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>

                <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg space-y-8">
                    <h3 className="text-xl font-semibold mb-3">Change Password</h3>
                    <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-300"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
