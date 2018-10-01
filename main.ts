import {Server} from './server/server'
import {usersRouter} from './users/users.router'
import {restaurantsRouter} from './restaurants/restaurants.router'
import {reviewRouter} from './reviews/reviews.router';
import { mainRouter } from './main.router';
const server = new Server()
server.bootstrap([usersRouter, restaurantsRouter, reviewRouter, mainRouter]).then(server=>{
    console.log('Server is listening on:',server.application.address())
}).catch(error =>{
    console.log('Server failed to start')
    console.log(error)
    process.exit(1)
})