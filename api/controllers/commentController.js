const Comment = require('../models/commentModel');

exports.getCommentsByProjectId = function (req, res, next) {
  const id = req.params.projectId;

  // Return comments
  Comment.find({ project_id: id },
    function (err, comment) {
      if (err) res.send(err);

      res.json(comment);
    });
}
