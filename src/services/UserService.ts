import { Request, Response } from 'express';
// import {User} from '../config/database';
import { User, Student, Teacher } from './../config/database';
import CustomError from '../types/customError';
import ErrorCode from '../constant/error';
import StatusCode from '../constant/status';

// Instead of using function from controller
// Calling service when needed
export class UserService {
  public async suspendUserWithEmail(email: string) {
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) {
        throw new CustomError(ErrorCode.USER_NOT_FOUND);
      }
      user.status = StatusCode.INACTIVE.message;
      await user.save();

      return true;
    } catch (e) {
      throw e;
    }
  }

  public async studentFindOrCreates(condition: any, defaults: any) {
    try {
      return await Student.findOrCreate({ where: condition, defaults });
    } catch (e) {
      throw e;
    }
  }

  public async teacherFindOrCreates(condition: any, defaults: any) {
    try {
      return await Teacher.findOrCreate({ where: condition, defaults });
    } catch (e) {
      throw e;
    }
  }

  public async userFindOrCreates(condition: any, defaults: any) {
    try {
      return await User.findOrCreate({ where: condition, defaults });
    } catch (e) {
      throw e;
    }
  }
}
