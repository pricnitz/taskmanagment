import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

const TaskDetailsPage = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await api.get(`/task/${id}`);
                setTask(res.data);
            } catch (err) {
                setError('Task not found or access denied.');
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    if (loading)
        return <div className="text-center text-white text-lg mt-10">Loading task details...</div>;

    if (error)
        return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;

    if (!task)
        return <div className="text-center text-yellow-500 text-lg mt-10">No task data found.</div>;

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-600';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className=" flex flex-col items-center justify-start  text-white">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-8  flex flex-col gap-3">
                <p className='flex justify-between'>
                    <div>
                        <p>
                            <span className="font-semibold">Priority:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-sm capitalize ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                            </span>
                        </p>
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-sm capitalize ${task.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                            }`}>
                            {task.status}
                        </span>
                    </div>
                </p>
                <div className='border-b pb-3'>
                    <h2 className="text-xl font-bold mb-3">Title: {task.title}</h2>
                    <p><span className="font-semibold">Description:</span> {task.description}</p>
                </div>


                <div className="space-y-4 text-gray-200">

                    <p><span className="font-semibold">Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}</p>

                    <p><span className="font-semibold">Created:</span> {new Date(task.createdAt).toLocaleString()}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4 justify-center">
                    <Link
                        to={`/tasks/${task._id}/edit`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition duration-300"
                    >
                        Edit Task
                    </Link>
                    <Link
                        to="/"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300"
                    >
                        Back to List
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsPage;
