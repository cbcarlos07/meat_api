import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'
class UsersRouter extends Router{
    appyRoutes(application: restify.Server){
        application.get('/users', (req, resp, next) => {
            User.find().then(users=>{
                resp.json(users)
                next()
            })
        })

        application.get('/users/:id', (req, resp, next)=>{
            User.findById(req.params.id).then(user => {
                if(user){
                    resp.json(user)
                    return next()
                }
                resp.send(404)
                next()
            })
        })

        application.post('/users', (req, resp, next)=>{
            let user = new User(req.body)
            user.save().then(user => {
                user.password = undefined //essa linha é usada para não ser mostrado de volta
                resp.json(user)
                return next()
            }) 
        })
    }
}

export const usersRouter = new UsersRouter