const Users = require('../models/userModel');

module.exports = function (router) {

  router.get('/users', function (req, res) {
    Users.find({}, { password: 0, projects: 0, "__v": 0 },
      function (err, users) {
        if (err) res.send(err);

        res.json(users);
      });
  });

  router.get('/users/:userId', function (req, res) {
    Users.findById({ _id: req.params.userId }, { password: 0, projects: 0, "__v": 0 },
      function (err, user) {
        if (err) res.send(err);

        res.json(user);
      });
  });

}
