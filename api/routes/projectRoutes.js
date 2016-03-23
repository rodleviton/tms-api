const ProjectController = require('../controllers/projectController');

module.exports = function (router) {
  router.get('/project/:id/:projectSlug', ProjectController.getProject);
}
