var mongoose = require('mongoose');

// Config the mongoose to use the native promise library
mongoose.promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
