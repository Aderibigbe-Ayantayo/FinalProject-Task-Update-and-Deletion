const express = require('express');
// const auth = require('../middleware/auth');
const authenticate = require('../middleware/auth');
const Task = require('../models/Task');
const router = express.Router();



// POST a new task
router.post('/tasks', authenticate, async (req, res) => {
    const { title, description, deadline, status, priority } = req.body;

    const task = new Task({
        title,
        description,
        deadline,
        status,
        priority,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err.message });
    }
});






//   Add Filtering and Sorting Parameters:
router.get('/tasks', authenticate, async (req, res) => {
    // res.send('Task Manager API');
    try {
        const { status, search, sortBy } = req.query;

        // Build query
        let query = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Fetch tasks from the database
        let tasks = await Task.find(query);

        // Sorting
        if (sortBy) {
            const sortOptions = {};
            switch (sortBy) {
                case 'deadline':
                    sortOptions.deadline = 1; // Ascending order
                    break;
                case 'priority':
                    sortOptions.priority = 1; // Ascending order
                    break;
                default:
                    sortOptions.createdAt = -1; // Default sorting by creation date
                    break;
            }
            tasks = await Task.find(query).sort(sortOptions);
        }

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Update a task
router.put('/:id', authenticate, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete a task
router.delete('/:id', authenticate, async (req, res) => {
    console.log(req.params.id)
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await Task.findByIdAndDelete({_id: req.params.id});
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
});


module.exports = router;
