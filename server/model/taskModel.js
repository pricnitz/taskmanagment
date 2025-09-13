const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'low' },
    dueDate: { type: Date},
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;