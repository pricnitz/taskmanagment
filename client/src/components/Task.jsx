import React from 'react';

const Task = ({ task, onDelete, onUpdate }) => {
  const { _id, title, description, dueDate, priority, completed } = task;

  const getPriorityClass = () => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      default:
        return 'border-l-4 border-green-500';
    }
  };

  return (
    <div className={`bg-white p-4 rounded shadow ${getPriorityClass()}`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500 mb-2">Due: {dueDate}</p>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {completed ? 'Completed' : 'Pending'}
        </span>
        <div>
          <button
            onClick={() => onUpdate(_id, { completed: !completed })}
            className="text-sm text-blue-500 hover:underline mr-2"
          >
            {completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;