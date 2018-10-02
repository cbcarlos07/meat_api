"use strict";
exports.__esModule = true;
var restify_errors_1 = require("restify-errors");
var users_model_1 = require("../users/users.model");
exports.authenticate = function (req, resp, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    users_model_1.User.findByEmail(email, '+password') //1st
        .then(function (user) {
        if (user && user.matches(password)) {
            //gerar o token
            //3rd
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid Credentials'));
        }
    })["catch"](next);
};
