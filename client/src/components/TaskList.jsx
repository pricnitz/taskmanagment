import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { tasks } = useTasks();
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderTasks = (priority) => {
        const filteredTasks = currentTasks.filter(task => task.priority === priority);
        return filteredTasks.length > 0 ? (
            filteredTasks.map(task => <TaskItem key={task._id} task={task} />)
        ) : (
            <p className="text-sm text-gray-400 italic mt-2">No {priority} priority tasks.</p>
        );
    };

    return (
        <div className="w-full ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* High Priority */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-white bg-red-500 px-3 py-1 rounded">High Priority</h2>
                    <div className="mt-4 space-y-3">{renderTasks('high')}</div>
                </div>

                {/* Medium Priority */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-white bg-yellow-500 px-3 py-1 rounded">Medium Priority</h2>
                    <div className="mt-4 space-y-3">{renderTasks('medium')}</div>
                </div>

                {/* Low Priority */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-white bg-green-500 px-3 py-1 rounded">Low Priority</h2>
                    <div className="mt-4 space-y-3">{renderTasks('low')}</div>
                </div>
            </div>

            {/* Pagination */}
            {tasks.length > tasksPerPage && (
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
