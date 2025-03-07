const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
};

module.exports = {
  getAll,
  getSingle
};