"use strict";
exports.__esModule = true;
var fs = require("fs");
var restify = require("restify");
var environment_1 = require("../common/environment");
var mongoose = require("mongoose");
var merge_patch_parser_1 = require("./merge-patch.parser");
var error_handler_1 = require("./error.handler");
var token_parser_1 = require("../security/token.parser");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.initializeDb = function () {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    };
    Server.prototype.initRoutes = function (routers) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0',
                    certificate: fs.readFileSync('./security/keys/cert.pem'),
                    key: fs.readFileSync('./security/keys/key.pem')
                });
                _this.application.use(restify.plugins.queryParser());
                _this.application.use(restify.plugins.bodyParser());
                _this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                _this.application.use(token_parser_1.tokenParser);
                //routes    
                for (var _i = 0, routers_1 = routers; _i < routers_1.length; _i++) {
                    var router = routers_1[_i];
                    router.appyRoutes(_this.application);
                }
                _this.application.listen(environment_1.environment.server.port, function () {
                    resolve(_this.application);
                });
                _this.application.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    };
    Server.prototype.bootstrap = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        return this.initializeDb().then(function () {
            return _this.initRoutes(routers).then(function () { return _this; });
        });
    };
    Server.prototype.shutdown = function () {
        var _this = this;
        return mongoose.disconnect().then(function () { return _this.application.close(); });
    };
    return Server;
}());
exports.Server = Server;
