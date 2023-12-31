/*
to pass the async errors to the error handler automatically
without the need to use next() with every route
*/
require('express-async-errors');
import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { config, checkingEnvVariables } from '../config/config';
import passport from '../config/passport';
import v1Routers from './routes/v1/routes';
import { errorHandler } from './middlewares/error-handler';
import morganMiddleware from './middlewares/morgan';
import Logger from './middlewares/logger';

class MyApplication {
  public _express: express.Application = express();
  public port: number = parseInt(config.port);
  public _server;
  public _db;

  constructor() {
    checkingEnvVariables();

    this.appMiddlewares();
    this.appRoutes();
    this.conn();
    this._server = this._express.listen(this.port, () => {
      Logger.info('Server Running..', 'http://localhost:' + this.port);
    });
  }

  /**
   * Express Midallwares & other configration ( Cookies, static path ..etc )
   */
  private appMiddlewares(): void {
    this._express.use(helmet());
    this._express.use(morganMiddleware);
    this._express.use(express.json());
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({ extended: false }));
    this._express.use(passport.initialize());
  }

  /**
   * Set All Application Routes from External Class's
   */
  private appRoutes(): void {
    this._express.use('/api/v1', v1Routers);
    this._express.use('/welcome', (req, res) => {
      res.send('Welcom to Login Service Api created by Abelrahman Ashraf');
    });
    this.errorRoutes();
  }

  private errorRoutes() {
    this._express.all('*', async (req, res) => {
      res.status(404).send('Not Found!');
    });
    this._express.use(errorHandler);
  }

  /**
   * Database Connection and Configration
   */
  public async conn() {
    try {
      const connection = await mongoose.connect(config.mongoose.url, config.mongoose.options);
      Logger.info('Db Connected Successfully.');
      this._db = connection.connection;
    } catch (error) {
      Logger.error(error);
    }
  }
}

export default new MyApplication();
