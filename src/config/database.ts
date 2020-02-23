const Sequelize = require('sequelize');
import { StudentModel } from './../models/student';
import { TeacherModel } from './../models/teacher';
import { AssignmentModel } from './../models/assignment';
import { UserModel } from './../models/users';
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  '',
  {
    host: process.env.HOST,
    dialect: 'mysql',
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export const User = UserModel(sequelize, Sequelize);

export const Assignment = AssignmentModel(sequelize, Sequelize);

export const Student = StudentModel(sequelize, Sequelize);

export const Teacher = TeacherModel(sequelize, Sequelize);

// Relationship
Student.belongsToMany(Teacher, {
  as: 'Teachers',
  foreignKey: 'student_id',
  through: 'assignments'
});
Teacher.belongsToMany(Student, {
  as: 'Students',
  foreignKey: 'teacher_id',
  through: 'assignments'
});
User.hasMany(Student);
Student.belongsTo(User);
User.hasMany(Teacher);
Teacher.belongsTo(User);

// Database sync
// sequelize.sync({ alter: true }).then(() => {
//   console.log(`Database & tables created!`);
// });
