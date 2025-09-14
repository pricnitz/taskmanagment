import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user and tasks on load
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/user/me');
                    setUser(res.data.user);
                    await fetchTasks();
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/task');
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/user/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            await fetchTasks();
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setTasks([]);
    };

    const createTask = async (taskData) => {
        try {
            const res = await api.post('/task', taskData);
            setTasks([...tasks, res.data.task]);
            return true;
        } catch (error) {
            console.error('Task creation failed:', error);
            return false;
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const res = await api.put(`/task/${id}`, taskData);
            setTasks(tasks.map(task => (task._id === id ? res.data.task : task)));
            return true;
        } catch (error) {
            console.error('Task update failed:', error);
            return false;
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/task/${id}`);
                setTasks(tasks.filter(task => task._id !== id));
            } catch (error) {
                console.error('Task deletion failed:', error);
            }
        }
    };
    
    // Add pagination logic here
    const getPaginatedTasks = (page, limit) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return tasks.slice(startIndex, endIndex);
    };

    const value = {
        tasks,
        user,
        loading,
        fetchTasks,
        login,
        logout,
        createTask,
        updateTask,
        deleteTask,
        getPaginatedTasks,
        totalTasks: tasks.length
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);