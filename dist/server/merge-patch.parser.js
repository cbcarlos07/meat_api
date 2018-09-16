"use strict";
exports.__esModule = true;
var mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = function (req, resp, next) {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new Error("Invalid content: " + e.message));
        }
    }
    return next();
};
