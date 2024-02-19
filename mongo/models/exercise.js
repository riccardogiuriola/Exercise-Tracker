// models/user.js
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

class Exercise {
    constructor(userId, description, duration, date = new Date()) {
        this.userId = userId;
        this.description = description;
        this.duration = duration;
        this.date = date;
    }

    save() {
        const db = getDB();
        return db.collection('exercises').insertOne(this);
    }

    static async getExercise(exerciseId) {
        const db = getDB();
        return await db.collection('exercises').findOne({ _id: new ObjectId(exerciseId) });
    }

    static async getAllExercises() {
        const db = getDB();
        return await db.collection('exercises').find().toArray();
    }

    static async getExercisesByUser(userId, from = new Date("1970-01-01"), to = new Date(), limit) {
        const db = getDB();
        const exercises = await db.collection('exercises').find(
            {
                userId: userId,
                date: {
                    $gte: new Date(from),
                    $lte: new Date(to)
                }
            }, // Query
            {
                projection: { _id: 0, userId: 0 } // Exclude _id and userId fields
            }
        ).limit(parseInt(limit)).toArray();

        exercises.forEach(exercise => {
            exercise.duration = parseInt(exercise.duration);
            exercise.date = (new Date(exercise.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })).replace(/,/g, '')
        });
        return exercises;
    }
}

module.exports = Exercise;
