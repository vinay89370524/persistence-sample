import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session)

import ApiV1RootRouter from './routes/api-v1/api-router';

class App {

  public express: express.Application;  

  constructor() {

    this.express = express();
    this.middleware();
    this.routes();

  }

  private middleware(): void {

    if (process.env.MONGO_DB_CONNECTION_STRING == undefined) {
      console.log(`CRITICAL: env var MONGO_DB_CONNECTION_STRING must be defined`);
      process.exit(1);
    }

    this.express.use(logger('dev'));
    this.express.use(bodyParser.json({limit: '200mb'}));
    this.express.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));    
    this.express.set('trust proxy', 1) //trust first proxy if it exists
    this.express.use(session({
      secret: 'Secret',
      store: new MongoStore({
        url: process.env.MONGO_DB_CONNECTION_STRING
      }),
      cookie: {
        secure: process.env.USE_SECURE_COOKIE == '1'
      }
    }))
  }  
  
  private routes(): void {
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Online!'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1', ApiV1RootRouter);
  }

}

export default new App().express;