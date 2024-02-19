// controllers/userController.js
const User = require('../models/user');

exports.createUser = (req, res) => {
    const { username } = req.body;
    const user = new User(username);
    user.save()
        .then(result => {
            res.json({
                username: username,
                _id: result.insertedId
            });
        })
        .catch(err => {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'An error occurred while creating user' });
        });
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
};