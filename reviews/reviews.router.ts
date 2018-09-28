import { ModelRouter } from '../common/model.router';
import * as restify from 'restify';
import { Review } from './reviews.model';
import * as mongoose from 'mongoose'
class ReviewRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }
    protected prepareOne(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<Review, Review>{
        return query.populate('user', 'name')
                    .populate('restaurant', 'name')
    }
  /*  findById = (req, resp, next)=>{
        this.model.findById(req.params.id)
            .populate('user', 'name')
            .populate('restaurant', 'name')
            .then(this.render(resp, next))
            .catch(next)
    }
    */

    appyRoutes(application: restify.Server){
        application.get('/reviews', this.findAll)
        application.get('/reviews/:id', [this.validateId, this.findById])
        application.post('/reviews', this.save)
    }
}
export const reviewRouter = new ReviewRouter()

