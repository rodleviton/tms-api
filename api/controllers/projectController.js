const Project = require('../models/projectModel');

exports.getProject = function (req, res, next) {
  const id = req.params.id;
  const projectSlug = req.params.projectSlug;

  // Return Project, Author and Steps
  Project
    .findOne({ _id: id, slug: projectSlug })
    .populate('posts user', '-password -projects -project_id -__v')
    .exec(function (err, project) {
      if (err) {
        res.send(err);
      } else {
        res.json(project);
      }
    });

}
