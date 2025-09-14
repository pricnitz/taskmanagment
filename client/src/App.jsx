import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import EditTaskPage from './pages/EditTaskPage';
import ProfilePage from './pages/ProfilePage';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import banner from './assets/banners/b1.jpg';

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <div
          className="min-h-screen w-full bg-fixed bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${banner}')` }}
        >
          <div className="min-h-screen w-full bg-black/60 text-white">
            <Navbar />

            <main className="pt-24 px-4">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tasks/:id" element={<TaskDetailsPage />} />
                  <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </TaskProvider>
    </Router>
  );
};

export default App;
