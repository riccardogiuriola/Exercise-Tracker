// controllers/userController.js
const Exercise = require('../models/exercise');
const User = require('../models/user');

exports.createExercise = async (req, res) => {
    const { description, duration, date = new Date() } = req.body;
    const { _id } = req.params;
    const exercise = new Exercise(_id, description, duration, new Date(date));
    let user = await User.getUser(_id);
    exercise.save()
        .then(async () => {
            user.description = description;
            user.duration = parseInt(duration);
            user.date = (new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })).replace(/,/g, '');
            res.json(user);
        })
        .catch(err => {
            console.error('Error creating exercise:', err);
            res.status(500).json({ error: 'An error occurred while creating exercise' });
        });
};

exports.getExerciseLogs = async (req, res) => {
    try {
        const { _id } = req.params;
        const { from, to, limit } = req.query;
        let user = await User.getUser(_id);
        const exercises = await Exercise.getExercisesByUser(_id, from, to, limit);
        user.count = exercises.length;
        user.log = exercises;
        return res.json(user)
    } catch (err) {
        console.error('Error fetching exercises:', err);
        res.status(500).json({ error: 'An error occurred while fetching exercises' });
    }
}