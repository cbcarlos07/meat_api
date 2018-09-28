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
var model_router_1 = require("../common/model.router");
var users_model_1 = require("./users.model");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        var _this = _super.call(this, users_model_1.User) || this;
        _this.findByEmail = function (req, resp, next) {
            if (req.query.email) {
                users_model_1.User.find({ email: req.query.email })
                    .then(_this.renderAll(resp, next))["catch"](next);
            }
            else {
                next();
            }
        };
        _this.on('beforeRender', function (document) {
            document.password = undefined;
            //ou delete document.password
        });
        return _this;
    }
    UsersRouter.prototype.appyRoutes = function (application) {
        //  console.log('application', application)      
        application.get({ path: '/users', version: '2.0.0' }, [this.findByEmail, this.findAll]);
        application.get({ path: '/users', version: '1.0.0' }, this.findAll);
        application.get('/users/:id', [this.validateId, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateId, this.replace]);
        application.patch('/users/:id', [this.validateId, this.update]);
        application.del('/users/:id', [this.validateId, this["delete"]]);
    };
    return UsersRouter;
}(model_router_1.ModelRouter));
exports.usersRouter = new UsersRouter;
