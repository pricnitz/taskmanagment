import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://localhost:3000/api/task',
        { title, description, dueDate, priority },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        onTaskCreated(res.data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('low');
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      ></textarea>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;