import * as jestCli from 'jest-cli'
import { environment } from "./common/environment";
import {Server} from './server/server'
import { usersRouter } from "./users/users.router";
import { User } from "./users/users.model";
import { reviewRouter } from "./reviews/reviews.router";
import { Review } from "./reviews/reviews.model";
let server: Server
const beforeAllTests = () => {
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    environment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([
        usersRouter,
        reviewRouter
    ]).then(()=>User.remove({}).exec())
      .then(()=>Review.remove({}).exec())  
}

const afterAllTests = () => {
    return server.shutdown()
}

beforeAllTests()
.then(()=>jestCli.run()) // jestCli.run() procura pelos tests 'manualmente'
.then(()=> afterAllTests())
.catch(console.error)