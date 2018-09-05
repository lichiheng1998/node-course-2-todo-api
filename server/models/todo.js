var mongoose = require('mongoose');

// Create a todo model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    // validator
    minlength: 1,
    // trim all white spaces on the head and tail
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  }
});

module.exports = {Todo};
