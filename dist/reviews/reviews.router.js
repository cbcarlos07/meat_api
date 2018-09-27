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
var reviews_model_1 = require("./reviews.model");
var ReviewRouter = /** @class */ (function (_super) {
    __extends(ReviewRouter, _super);
    function ReviewRouter() {
        return _super.call(this, reviews_model_1.Review) || this;
    }
    ReviewRouter.prototype.prepareOne = function (query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    };
    /*  findById = (req, resp, next)=>{
          this.model.findById(req.params.id)
              .populate('user', 'name')
              .populate('restaurant', 'name')
              .then(this.render(resp, next))
              .catch(next)
      }
      */
    ReviewRouter.prototype.appyRoutes = function (application) {
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
    };
    return ReviewRouter;
}(model_router_1.ModelRouter));
exports.reviewRouter = new ReviewRouter();
