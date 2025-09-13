import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/"
            element={
              <>
                <TaskForm />
                <TaskList />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;