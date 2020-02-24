import express, { Application } from 'express';
import dotenv from 'dotenv';
import route from './route';
import { sequelize } from './config/database';
dotenv.config(); // development purpose

class App {
  public app: Application;
  public port: number;

  constructor(appInit: {
    port: number;
    middleWares: any;
    postMiddlewares: any;
  }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes();
    this.sequelize();
    this.postMiddlewares(appInit.postMiddlewares);
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private postMiddlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes() {
    route(this.app);
  }

  private sequelize() {
    // Init DB here
    // new sequelize
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
