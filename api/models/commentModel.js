const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  step: { type: Schema.Types.ObjectId, ref: 'Step' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
