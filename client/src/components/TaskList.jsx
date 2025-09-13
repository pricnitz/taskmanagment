import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/api/task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:3000/api/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleUpdate = (id, updates) => {
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:3000/api/task/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const updatedTasks = tasks.map((task) => {
          if (task._id === id) {
            return { ...task, ...updates };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;