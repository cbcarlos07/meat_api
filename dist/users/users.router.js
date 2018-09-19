"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var router_1 = require("../common/router");
var restify_errors_1 = require("restify-errors");
var users_model_1 = require("./users.model");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        var _this = _super.call(this) || this;
        _this.on('beforeRender', function (document) {
            document.password = undefined;
            //ou delete document.password
        });
        return _this;
    }
    UsersRouter.prototype.appyRoutes = function (application) {
        var _this = this;
        //  console.log('application', application)      
        application.get('/users', function (req, resp, next) {
            users_model_1.User.find()
                .then(_this.render(resp, next))["catch"](next);
        });
        application.get('/users/:id', function (req, resp, next) {
            users_model_1.User.findById(req.params.id)
                .then(_this.render(resp, next))["catch"](next);
        });
        application.post('/users', function (req, resp, next) {
            var user = new users_model_1.User(req.body);
            user.save()
                .then(_this.render(resp, next))["catch"](next);
        });
        application.put('/users/:id', function (req, resp, next) {
            var options = { runValidators: true, overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(function (result) {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            })
                .then(function (users) {
                resp.json(users);
                return next();
            })["catch"](next);
        });
        application.patch('/users/:id', function (req, resp, next) {
            var options = { runValidators: true, "new": true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(_this.render(resp, next))["catch"](next);
        });
        application.del('/users/:id', function (req, resp, next) {
            users_model_1.User.remove({ _id: req.params.id })
                .exec()
                .then(function (cmdResult) {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            })["catch"](next);
        });
    };
    return UsersRouter;
}(router_1.Router));
exports.usersRouter = new UsersRouter;
