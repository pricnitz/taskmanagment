import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const ProtectedRoute = () => {
    const { user, loading } = useTasks();
    
    if (loading) {
        return <div className="loading">Loading...</div>; // Or a spinner
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;