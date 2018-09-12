import * as restify from 'restify'

export abstract class Router {
    abstract appyRoutes(application: restify.Server)
}
