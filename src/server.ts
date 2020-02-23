import App from './app';
import errorMiddleware from './middleware/error';
import * as bodyParser from 'body-parser';
// import flash from 'connect-flash';

// When dealing with frontend error/success message
const flashMsg = (req: any, res: any, next: any) => {
  //   res.locals.errors = req.flash('error');
  //   res.locals.successes = req.flash('success');
  next();
};

const app = new App({
  port: 5000,
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    flashMsg
  ],
  postMiddlewares: [errorMiddleware]
});

app.listen();
