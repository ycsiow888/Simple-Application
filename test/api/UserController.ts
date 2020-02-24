import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { Teacher, Student, User } from '../config/database';
import { AssignmentService } from './../services/AssignmentService';
import { UserService } from './../services/UserService';
import IControllerBase from '../interfaces/IControllerBase.interface';

class UserController implements IControllerBase {
  public path = '';
  public router = express.Router();
  public student = 'student';
  public teacher = 'teacher';

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
  }

  registration = async (req: Request, res: Response, next: NextFunction) => {
    await check('teacher', 'Teacher is required')
      .notEmpty()
      .run(req);

    await check('students', 'Student is required')
      .notEmpty()
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const teacher = req.body.teacher;
    const student = req.body.students;

    try {
      // Register user if not exist
      const userCondition = { email: teacher };
      const userDefault = { email: teacher, role: this.teacher };
      const [user] = await new UserService().userFindOrCreates(
        userCondition,
        userDefault
      );

      // Register teacher if not exist
      const teacherCondition = { userId: user.id };
      const teacherDefault = {
        userId: user.id,
        graduated_at: 'University'
      };
      const [registeredTeacher] = await new UserService().teacherFindOrCreates(
        teacherCondition,
        teacherDefault
      );

      // Register student if not exist
      student.forEach(async (student_email: String) => {
        const userStudCondition = { email: student_email, role: this.student };
        const userStudDefault = { email: student_email, role: this.student };

        const [user, created] = await new UserService().userFindOrCreates(
          userStudCondition,
          userStudDefault
        );

        const studentCondition = { userId: user.id };
        const studentDefault = { class: 'primary', userId: user.id };

        const [
          registeredStudent
        ] = await new UserService().studentFindOrCreates(
          studentCondition,
          studentDefault
        );

        // Assign student to specific teacher
        if (registeredStudent) {
          await new AssignmentService().createAssignment(
            registeredTeacher.id,
            registeredStudent.id
          );
        }
      });

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
}
export default UserController;
