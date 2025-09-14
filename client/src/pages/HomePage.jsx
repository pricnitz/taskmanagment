import React from 'react';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';
import { useTasks } from '../context/TaskContext';

const HomePage = () => {
    const { createTask } = useTasks();

    const handleCreate = async (taskData) => {
        await createTask(taskData);
    };

    return (
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
            <div className="col-span-3">
                <TaskList />
            </div>
            <div className="col-span-1">
                <CreateTaskForm onSubmit={handleCreate} />
            </div>
        </div>
         </div>
       
    );
};

export default HomePage;