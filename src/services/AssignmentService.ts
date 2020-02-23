import { Request, Response } from 'express';
// import {User} from '../config/database';
import { Assignment } from './../config/database';
import CustomError from '../types/customError';
import ErrorCode from '../constant/error';

// Instead of using function from controller
// Calling service when needed
export class AssignmentService {
  public async createAssignment(teacher: number, student: number) {
    try {
      return await Assignment.findOrCreate({
        where: {
          student_id: student,
          teacher_id: teacher
        },
        defaults: {
          teacher_id: teacher,
          student_id: student,
          status: 'active'
        }
      });
    } catch (e) {
      throw new CustomError(ErrorCode.DOMAIN_NOT_FOUND);
    }
  }
}
