import { Application, Request, Response, NextFunction } from 'express';
import UserController from './api/UserController';
import AssignmentController from './api/AssignmentController';
import NotificationController from './api/NotificationController';

const route = (app: Application) => {
  // Router
  app.use('/api', new UserController().router);
  app.use('/api', new AssignmentController().router);
  app.use('/api', new NotificationController().router);
};

export default route;
