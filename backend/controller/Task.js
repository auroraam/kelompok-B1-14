const Task = require('../model/Task_m');
const User = require('../model/User_m')
const axios = require('axios');
const asyncHandler = require('express-async-handler');

const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, deadline, difficulty, priority, subtasks = [] } = req.body;

        if (!title || !description || !deadline || !difficulty || !priority ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userId = req.user.id;

        const taskObject = {
            userId,
            title,
            description,
            deadline,
            difficulty,
            priority,
            subtasks
        };

        const task = await Task.create(taskObject);

        if (task) {
            return res.status(201).json({ message: 'Task created!', task });
        } else {
            return res.status(400).json({ message: 'Failed to create task!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const getAllTask = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

const getTaskByUserId = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ userId });

        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }

        const groupedTasks = {
            High: [],
            Medium: [],
            Low: []
        };

        tasks.forEach(task => {
            groupedTasks[task.priority].push(task);
        });

        res.status(200).json(groupedTasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user tasks', error: error.message });
    }
});

const getTaskByTaskId = asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.query;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task by ID', error: error.message });
    }
});

// UPDATE TASK
const updateTask = asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.query;
        console.log('taskId:', taskId);          // <-- taruh di sini
        console.log('body:', req.body); 
        const { title, description, deadline, difficulty, priority, subtasks } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.deadline = deadline || task.deadline;
        task.difficulty = difficulty || task.difficulty;
        task.priority = priority || task.priority;
        task.subtasks = subtasks || task.subtasks;

        const updatedTask = await task.save();

        res.status(200).json({ message: 'Task updated!', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

const markTaskDone = asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.query;
        const { isDone } = req.body; // kirim true atau false

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.isDone = isDone;

        const updatedTask = await task.save();
        res.status(200).json({ message: 'Task status updated!', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating late tasks', error: error.message });
    }
});

const updateLateStatus = asyncHandler(async (req, res) => {
    try {
        const now = new Date();
        const tasks = await Task.find();

        const updates = await Promise.all(tasks.map(async task => {
            const wasLate = task.isLate;
            const shouldBeLate = !task.isDone && task.deadline < now;

            if (wasLate !== shouldBeLate) {
                task.isLate = shouldBeLate;
                return await task.save();
            } else {
                return null; // no need to update
            }
        }));

        res.status(200).json({ message: 'Late statuses updated', updated: updates.filter(Boolean) });
    } catch (error) {
        res.status(500).json({ message: 'Error updating late statuses', error: error.message });
    }
});

const updateTaskCategory = asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.query;
        const { category } = req.body; // ex: 'Cicil' atau 'Langsung'

        // Validasi nilai kategori
        const validCategories = ['Cicil', 'Langsung'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category value' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.category = category;

        const updatedTask = await task.save();
        res.status(200).json({ message: 'Task category updated!', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task category', error: error.message });
    }
});

const fetchPredictionFromML = asyncHandler(async (req, res) => {
  try {
    const tasks = taskDocs.map(task => ({
      id: task._id.toString(),
      nama_tugas: task.title,
      deadline: task.deadline,
      priority: task.priority === 'High' ? 5 : task.priority === 'Medium' ? 3 : 1,
      difficulity: task.difficulty === 'Hard' ? 5 : task.difficulty === 'Medium' ? 3 : 1,
      subTask: task.subtasks.length
    })); // Array of task objects

    if (!Array.isArray(tasks)) {
      return res.status(400).json({ message: 'Tasks must be an array' });
    }

    const response = await axios.post(
      'https://6103-34-83-173-246.ngrok-free.app/',
      tasks,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const predictions = response.data;

    res.status(200).json({ message: 'Predictions fetched', predictions });
  } catch (error) {
    console.error('Error calling ML API:', error.message);
    res.status(500).json({ message: 'Failed to fetch predictions', error: error.message });
  }
});

// DELETE TASK
const deleteTask = asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.query;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

module.exports = { createTask, getAllTask, getTaskByTaskId, getTaskByUserId, updateTask, markTaskDone, updateLateStatus, updateTaskCategory, fetchPredictionFromML, deleteTask };
