import * as express from 'express';
import ErrorCode from '../constant/error';
import { QueryTypes, Op } from 'sequelize';
import CustomError from '../types/customError';
import { sequelize, User } from '../config/database';
import { CommonService } from './../services/CommonService';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult, query } from 'express-validator';
import IControllerBase from '../interfaces/IControllerBase.interface';
import { UserService } from '../services/UserService';

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

      // If user found then suspend its status
      const status = await new UserService().suspendUserWithEmail(email);
      if (!status) {
        next(new CustomError(ErrorCode.UNEXPECTED_ERROR));
      }

      return res.status(204).send();
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
      const students_user = await new CommonService().query(
        student_query,
        { email: teacher, count },
        QueryTypes.SELECT
      );

      // Convert student id into array
      const student_array = students_user.map((item: any) => {
        return item['student_id'];
      });

      // Get student id array info
      const student_info_query =
        'SELECT users.email as email FROM `users` inner join students on users.id = students.userId where students.id in (:id)';
      const student_info = await new CommonService().query(
        student_info_query,
        { id: student_array },
        QueryTypes.SELECT
      );

      const result = { students: student_info };

      return res.send(result);
    } catch (e) {
      next(e);
    }
  };
}
export default AssignmentController;
