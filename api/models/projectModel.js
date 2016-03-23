const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  slug: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

// Slugify title before saving
projectSchema.pre('save', function (next) {
  const project = this;
  project.slug = projectSchema.methods.slugify(this.title);

  next();
});

projectSchema.methods.slugify = function (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
