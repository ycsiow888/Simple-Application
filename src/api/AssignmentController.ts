import * as express from 'express';
import ErrorCode from '../constant/error';
import { QueryTypes, Op } from 'sequelize';
import CustomError from '../types/customError';
import { sequelize, User } from '../config/database';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult, query } from 'express-validator';
import IControllerBase from '../interfaces/IControllerBase.interface';

class AssignmentController implements IControllerBase {
  public path = '';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/commonstudents`, this.assignment);
    this.router.post(`${this.path}/suspend`, this.suspend);
  }

  suspend = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await check('student', 'Student is required')
        .notEmpty()
        .run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const email = req.body.student;

      const user = await User.findOne({
        where: {
          email
        }
      });

      // If user found then suspend its status
      if (user) {
        user.status = 'inactive';
        await user.save();
        return res.status(204).send();
      }

      next(new CustomError(ErrorCode.USER_NOT_FOUND));
    } catch (e) {
      next(e);
    }
  };

  assignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await query('teacher', 'Teacher is required')
        .notEmpty()
        .run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const teacher = req.query.teacher;

      // Convert query into array
      const teacher_array =
        typeof teacher == 'object'
          ? teacher.map((item: any) => {
              return "'" + item + "'";
            })
          : [teacher];

      const count = teacher_array.length;

      let student_query =
        'select count(teacher_id), assignments.*,users.email as email from assignments ';
      student_query +=
        'inner join teachers on assignments.teacher_id=teachers.id inner join users on teachers.userId = users.id ';
      student_query += 'where users.email in (:email) ';
      student_query += 'group by student_id having COUNT(teacher_id) = :count';

      // Get common student id
      const students_user = await sequelize.query(student_query, {
        replacements: { email: teacher, count },
        type: QueryTypes.SELECT
      });

      // Convert student id into array
      const student_array = students_user.map((item: any) => {
        return item['student_id'];
      });

      // Get student id array info
      const student_info = await sequelize.query(
        'SELECT users.email as email FROM `users` inner join students on users.id = students.userId where students.id in (:id)',
        { replacements: { id: student_array }, type: QueryTypes.SELECT }
      );

      const result = { students: student_info };

      return res.send(result);
    } catch (e) {
      next(e);
    }
  };
}
export default AssignmentController;
