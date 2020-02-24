import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { Teacher, Student, User } from '../config/database';
import { AssignmentService } from './../services/AssignmentService';
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
      const [user] = await User.findOrCreate({
        where: {
          email: teacher
        },
        defaults: {
          email: teacher,
          role: this.teacher
        }
      });

      // Register teacher if not exist
      const [registeredTeacher] = await Teacher.findOrCreate({
        where: { userId: user.id },
        defaults: {
          userId: user.id,
          graduated_at: 'University'
        }
      });

      // Register student if not exist
      student.forEach(async (student_email: String) => {
        const [user, created] = await User.findOrCreate({
          where: { email: student_email, role: this.student },
          defaults: {
            email: student_email,
            role: this.student
          }
        });
        const [registeredStudent] = await Student.findOrCreate({
          where: { userId: user.id },
          defaults: {
            class: 'primary',
            userId: user.id
          }
        });

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
