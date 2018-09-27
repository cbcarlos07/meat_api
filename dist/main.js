"use strict";
exports.__esModule = true;
var server_1 = require("./server/server");
var users_router_1 = require("./users/users.router");
var restaurants_router_1 = require("./restaurants/restaurants.router");
var reviews_router_1 = require("./reviews/reviews.router");
var server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter, restaurants_router_1.restaurantsRouter, reviews_router_1.reviewRouter]).then(function (server) {
    console.log('Server is listening on:', server.application.address());
})["catch"](function (error) {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});
