"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var router_1 = require("../common/router");
var users_model_1 = require("./users.model");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersRouter.prototype.appyRoutes = function (application) {
        application.get('/users', function (req, resp, next) {
            users_model_1.User.find().then(function (users) {
                resp.json(users);
                next();
            });
        });
        application.get('/users/:id', function (req, resp, next) {
            users_model_1.User.findById(req.params.id).then(function (user) {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                next();
            });
        });
        application.post('/users', function (req, resp, next) {
            var user = new users_model_1.User(req.body);
            user.save().then(function (user) {
                user.password = undefined; //essa linha é usada para não ser mostrado de volta
                resp.json(user);
                return next();
            });
        });
        application.put('/users/:id', function (req, resp, next) {
            var options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(function (result) {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    resp.json(404);
                }
            })
                .then(function (users) {
                resp.json(users);
                return next();
            });
        });
    };
    return UsersRouter;
}(router_1.Router));
exports.usersRouter = new UsersRouter;
