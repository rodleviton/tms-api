const CommentController = require('../controllers/commentController');

module.exports = function (router) {
  router.get('/comments/:projectId', CommentController.getCommentsByProjectId);
}
