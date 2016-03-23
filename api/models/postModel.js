const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  description: String,
  slug: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

// Slugify title before saving
postSchema.pre('save', function (next) {
  const post = this;
  post.slug = postSchema.methods.slugify(this.title);

  next();
});

postSchema.methods.slugify = function (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
