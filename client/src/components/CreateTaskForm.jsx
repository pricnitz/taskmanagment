import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

const CreateTaskForm = ({ initialTask = {}, onSubmit, isEditing = false }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'low',
        status: 'pending'
    });

    useEffect(() => {
        if (isEditing) {
            setTaskData({
                title: initialTask.title || '',
                description: initialTask.description || '',
                dueDate: initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '',
                priority: initialTask.priority || 'low',
                status: initialTask.status || 'pending',
            });
        }
    }, [initialTask, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(taskData);
        if (!isEditing) {
            setTaskData({
                title: '',
                description: '',
                dueDate: '',
                priority: 'low',
                status: 'pending'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-white">{isEditing ? 'Edit Task' : 'Create a New Task'}</h2>

            <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
                className="px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Task Description"
                rows={4}
                className="px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />

            <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className="px-4 py-2 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="px-4 py-2 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            {isEditing && (
                <select name="status" value={taskData.status} onChange={handleChange} className="px-4 py-2 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            )}

            <button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md transition duration-300">
                {isEditing ? 'Update Task' : 'Create Task'}
            </button>
        </form>

    );
};

export default CreateTaskForm;