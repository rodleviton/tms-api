const Posts = require('../models/postModel');

module.exports = function (router) {

  /**
   * Returns posts for project
   */
  router.get('/project/:projectId/posts', function (req, res) {
    Posts.find({ project_id: req.params.projectId },
      function (err, posts) {
        if (err) res.send(err);

        res.json(posts);
      });
  });

}