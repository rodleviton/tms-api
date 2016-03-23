const log = require('../util/log');
const config = require('../config');

// Users
const User = require('../api/models/userModel');
const usersFixture = require('./fixtures/usersFixture');

// Projects
const Project = require('../api/models/projectModel');
const projectsFixture = require('./fixtures/projectsFixture');

// Posts
const Post = require('../api/models/postModel');
const postsFixture = require('./fixtures/postsFixture');

config.connect('dev'); // connect to database

const util = {
  complete: function () {
    process.exit();
  },
  logItem: function (item, prop) {
    log.item(item[prop]);
  }
}

function createSeedData(model, fixture) {
  return new Promise(function (fulfill, reject) {
    model.create(fixture, function (err, user) {
      if (err) {
        reject(err);
      }
      fulfill();
    });
  });
}

/**
 * Remove existing seed data
 * @param  {[type]}   models [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
function removeCollections(models, cb) {
  return new Promise(function (fulfill, reject) {
    models.forEach(function (model, index) {
      model.remove({}, function (err) {
        if (err) {
          reject(err);
        }

        log.warn('Removing existing ' + model.modelName + ' data.');
        log.util.split();

        if (index === 0) {
          fulfill();
        }
      });
    });
  });
}

/**
 * Start seeding
 */
removeCollections([User, Project, Post]).then(function () {
  createSeedData(User, usersFixture).then(function () {
    log.info('Created see Users.');
    log.util.split();

    createSeedData(Project, projectsFixture).then(function () {
      log.info('Created see Projects.');
      log.util.split();

      createSeedData(Post, postsFixture).then(function () {
        log.info('Created see Posts.');
        log.util.split();
        util.complete();
      });
    });
  });
});
