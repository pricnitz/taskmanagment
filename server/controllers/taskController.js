
const Task = require("../model/taskModel");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    // Ensure title is provided
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Create task with owner from auth middleware
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      owner: req.user._id,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks for loggedin user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID (only if owned by user)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID (only if owned by user)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID (only if owned by user)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
