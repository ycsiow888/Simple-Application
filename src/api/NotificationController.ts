import * as express from 'express';
import { QueryTypes, Op } from 'sequelize';
import { sequelize, User } from '../config/database';
import { Request, Response, NextFunction } from 'express';
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

      // Get list of student id registered/assigned to this teacher
      let student_query =
        'select students.userId as student_user_id from assignments ';
      student_query +=
        'inner join teachers on assignments.teacher_id = teachers.id ';
      student_query += 'inner join users on teachers.userId = users.id ';
      student_query +=
        'inner join students on assignments.student_id = students.id ';
      student_query += 'where users.email = :teacher';

      const students_user = await sequelize.query(student_query, {
        replacements: { teacher },
        type: QueryTypes.SELECT
      });
      const student_user_array = students_user.map((item: any) => {
        return item.student_user_id;
      });

      let text = req.body.notification;
      let textReceipient = [];

      // Loop in notification until no more @receipient
      do {
        // Get index start from @ and substring
        let startIndex = text.indexOf('@');
        text = text.substring(startIndex + 1);
        let endIndex = text.indexOf(' ');
        endIndex = endIndex < 0 ? text.length : endIndex;

        // Push receipient into text receipient
        textReceipient.push(text.substring(0, endIndex));

        // Replace leftover string to text
        text = text.substring(endIndex + 1);
      } while (text.includes('@'));

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
