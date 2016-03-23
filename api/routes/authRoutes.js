const AuthController = require('../controllers/authController');
const passportService = require('../services/passportService');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (router) {
  // router.get('/', requireAuth, function (req, res) {
  //   res.send({ hi: 'there' });
  // });
  router.post('/signin', requireSignin, AuthController.signin);
  router.post('/signup', AuthController.signup);
}