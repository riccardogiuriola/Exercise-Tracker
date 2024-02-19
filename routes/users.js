// users.js
const express = require('express');
const router = express.Router();
const userController = require('../mongo/controllers/userController');
const exerciseController = require('../mongo/controllers/exerciseController');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.post('/:_id/exercises', exerciseController.createExercise);
router.get('/:_id/logs', exerciseController.getExerciseLogs);

module.exports = router;
