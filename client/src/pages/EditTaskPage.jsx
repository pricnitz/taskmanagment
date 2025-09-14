import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreateTaskForm from '../components/CreateTaskForm';
import { useTasks } from '../context/TaskContext';
import api from '../api/api';

const EditTaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateTask } = useTasks();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await api.get(`/task/${id}`);
                setTask(res.data);
            } catch (err) {
                setError('Failed to fetch task for editing.');
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleUpdate = async (taskData) => {
        const success = await updateTask(id, taskData);
        if (success) {
            navigate(`/tasks/${id}`);
        } else {
            alert('Failed to update task.');
        }
    };

    if (loading) return <div className="loading">Loading task...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div >
            <CreateTaskForm initialTask={task} onSubmit={handleUpdate} isEditing={true} />
        </div>
    );
};

export default EditTaskPage;