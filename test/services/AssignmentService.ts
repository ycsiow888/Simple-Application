import { Assignment } from './../config/database';
import StatusCode from '../constant/status';

// Instead of using function from controller
// Calling service when needed
export class AssignmentService {
  public async createAssignment(t_id: number, s_id: number) {
    try {
      return await Assignment.findOrCreate({
        where: {
          student_id: s_id,
          teacher_id: t_id
        },
        defaults: {
          teacher_id: t_id,
          student_id: s_id,
          status: StatusCode.ACTIVE
        }
      });
    } catch (e) {
      throw e;
    }
  }
}
