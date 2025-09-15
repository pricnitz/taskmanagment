import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { FaTrash, FaEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TaskItem = ({ task }) => {
    const { updateTask, deleteTask } = useTasks();

    const handleStatusChange = () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        updateTask(task._id, { status: newStatus });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'blue';
            default: return 'gray';
        }
    };

    return (
        <div className={`task-item ${task.status}`}>
            <div className="border bg-white/15 rounded p-3 flex flex-col gap-3" style={{ border: getPriorityColor(task.priority) }}>
                <h3 className='text-md font-bold text-gray-200'><Link to={`/tasks/${task._id}`}>{task.title}</Link></h3>
                <hr className='text-white' />
                <span className="text-md text-gray-300">
                    Description<br />
                    {task.description?.length > 30
                        ? task.description.slice(0, 30) + "..."
                        : task.description}
                </span>
                <p className="text-md text-gray-300">Complete Before <br /> {new Date(task.dueDate).toLocaleDateString()}</p>
                <div className="flex gap-3">
                    <button onClick={handleStatusChange} className="status-button">
                        {task.status === 'completed' ? <FaCheckCircle className='text-green-500' /> : <FaTimesCircle className='text-red-500' />}
                    </button>
                    <Link to={`/tasks/${task._id}/edit`} className="edit-button">
                        <FaEdit className='text-yellow-500' />
                    </Link>
                    <button onClick={() => deleteTask(task._id)} className="delete-button">
                        <FaTrash className='text-red-500' />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default TaskItem;