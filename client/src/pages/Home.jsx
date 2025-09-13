import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tasks')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;