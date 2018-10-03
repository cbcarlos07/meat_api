"use strict";
exports.__esModule = true;
var jestCli = require("jest-cli");
var environment_1 = require("./common/environment");
var server_1 = require("./server/server");
var users_router_1 = require("./users/users.router");
var users_model_1 = require("./users/users.model");
var reviews_router_1 = require("./reviews/reviews.router");
var reviews_model_1 = require("./reviews/reviews.model");
var server;
var beforeAllTests = function () {
    environment_1.environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db';
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server.bootstrap([
        users_router_1.usersRouter,
        reviews_router_1.reviewRouter
    ]).then(function () { return users_model_1.User.remove({}).exec(); })
        .then(function () {
        var admin = new users_model_1.User();
        admin.name = 'admin';
        admin.email = 'admin@email.com';
        admin.password = '123456';
        admin.profiles = ['admin', 'user'];
        return admin.save();
    })
        .then(function () { return reviews_model_1.Review.remove({}).exec(); });
};
var afterAllTests = function () {
    return server.shutdown();
};
beforeAllTests()
    .then(function () { return jestCli.run(); }) // jestCli.run() procura pelos tests 'manualmente'
    .then(function () { return afterAllTests(); })["catch"](console.error);
