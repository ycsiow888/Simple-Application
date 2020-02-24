import * as express from 'express';
import { QueryTypes, Op } from 'sequelize';
import { sequelize, User } from '../config/database';
import { Request, Response, NextFunction } from 'express';
import { CommonService } from './../services/CommonService';
import { check, validationResult, query } from 'express-validator';
import IControllerBase from '../interfaces/IControllerBase.interface';

class NotificationController implements IControllerBase {
  public path = '';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(
      `${this.path}/retrievefornotifications`,
      this.retrievenotification
    );
  }

  retrievenotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Input checking
      await check('teacher', 'Teacher is required')
        .notEmpty()
        .run(req);

      await check('notification', 'Notification is required')
        .notEmpty()
        .run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const teacher = req.body.teacher;
      const text = req.body.notification;

      // Get list of student id registered/assigned to this teacher
      let student_query =
        'select students.userId as student_user_id from assignments ';
      student_query +=
        'inner join teachers on assignments.teacher_id = teachers.id ';
      student_query += 'inner join users on teachers.userId = users.id ';
      student_query +=
        'inner join students on assignments.student_id = students.id ';
      student_query += 'where users.email = :teacher';

      const students_user = await new CommonService().query(
        student_query,
        { teacher },
        QueryTypes.SELECT
      );
      const student_user_array = students_user.map((item: any) => {
        return item.student_user_id;
      });

      const textReceipient = await new CommonService().extractReceipientFromText(
        text,
        '@'
      );

      // **Enhance in future by converting into services
      // Get list of not suspended users email which registered under this teacher and email not mention in notification
      let receipient = await User.findAll({
        raw: true,
        attributes: ['email'],
        where: {
          status: {
            [Op.ne]: 'inactive'
          },
          email: {
            [Op.notIn]: textReceipient
          },
          id: {
            [Op.in]: student_user_array
          }
        }
      });

      const receipient_array = receipient.map((item: any) => {
        return item.email;
      });

      // **Enhance in future by converting into services
      // Filter text receipient to only not suspended user
      let notSuspendedUser = await User.findAll({
        raw: true,
        attributes: ['email'],
        where: {
          status: {
            [Op.ne]: 'inactive'
          },
          email: {
            [Op.in]: textReceipient
          }
        }
      });

      const textReceipientArray = notSuspendedUser.map((item: any) => {
        return item.email;
      });

      return res.json({
        receipients: receipient_array.concat(textReceipientArray)
      });
    } catch (e) {
      next(e);
    }
  };
}
export default NotificationController;
