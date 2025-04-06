const { Router } = require('express');
const router = Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileHelper');

// Get all tasks for a user
router.get('/:email', (req, res) => {
  try {
    const { email } = req.params;
    const data = readJsonFile('data.json');
    const userTasks = data.tasks.filter(task => task.email === email);
    res.status(200).json({ tasks: userTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// Get important tasks
router.get('/:email/important', (req, res) => {
  try {
    const { email } = req.params;
    const data = readJsonFile('data.json');
    const importantTasks = data.tasks.filter(task => 
      task.email === email && task.important
    );
    res.status(200).json({ tasks: importantTasks });
  } catch (error) {
    console.error('Error fetching important tasks:', error);
    res.status(500).json({ message: 'Server error while fetching important tasks' });
  }
});

// Get today's tasks
router.get('/:email/today', (req, res) => {
  try {
    const { email } = req.params;
    const data = readJsonFile('data.json');
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = data.tasks.filter(task => 
      task.email === email && task.duedate === today
    );
    res.status(200).json({ tasks: todayTasks });
  } catch (error) {
    console.error('Error fetching today\'s tasks:', error);
    res.status(500).json({ message: 'Server error while fetching today\'s tasks' });
  }
});

// Get tasks by category
router.get('/:email/category/:category', (req, res) => {
  try {
    const { email, category } = req.params;
    const data = readJsonFile('data.json');
    const categoryTasks = data.tasks.filter(task => 
      task.email === email && task.category === category
    );
    res.status(200).json({ tasks: categoryTasks });
  } catch (error) {
    console.error('Error fetching category tasks:', error);
    res.status(500).json({ message: 'Server error while fetching category tasks' });
  }
});

// Create new task
router.post('/:email', (req, res) => {
  try {
    const { email } = req.params;
    const { Task, duedate, category, important = false } = req.body;

    if (!Task || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const data = readJsonFile('data.json');
    const highestId = data.tasks.reduce((max, task) => 
      task.id > max ? task.id : max, 0
    );

    const newTask = {
      id: highestId + 1,
      email,
      Task,
      duedate: duedate || new Date().toISOString().split('T')[0],
      category,
      important: !!important,
      completed: false
    };

    data.tasks.push(newTask);
    writeJsonFile('data.json', data);

    res.status(201).json({
      message: 'Task created successfully',
      tasks: data.tasks.filter(task => task.email === email)
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
});

// Toggle task completion
router.patch('/:email/:taskId/toggle', (req, res) => {
  try {
    const { email, taskId } = req.params;
    const data = readJsonFile('data.json');
    const taskIndex = data.tasks.findIndex(task => 
      task.id === parseInt(taskId) && task.email === email
    );

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    data.tasks[taskIndex].completed = !data.tasks[taskIndex].completed;
    writeJsonFile('data.json', data);

    res.status(200).json({
      message: 'Task updated successfully',
      tasks: data.tasks.filter(task => task.email === email)
    });
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).json({ message: 'Server error while toggling task' });
  }
});

// Delete task
router.delete('/:email/:taskId', (req, res) => {
  try {
    const { email, taskId } = req.params;
    const data = readJsonFile('data.json');
    const taskIndex = data.tasks.findIndex(task => 
      task.id === parseInt(taskId) && task.email === email
    );

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    data.tasks.splice(taskIndex, 1);
    writeJsonFile('data.json', data);

    res.status(200).json({
      message: 'Task deleted successfully',
      tasks: data.tasks.filter(task => task.email === email)
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

module.exports = router;