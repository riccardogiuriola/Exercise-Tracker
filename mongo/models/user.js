// models/user.js
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

class User {
    constructor(username) {
        this.username = username;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    static async getAllUsers() {
        const db = getDB();
        return await db.collection('users').find().toArray();
    }

    static async getUser(userId) {
        const db = getDB();
        return await db.collection('users').findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
