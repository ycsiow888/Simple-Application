import Sequelize from 'sequelize';

export const AssignmentModel = (sequelize: any, type: any) => {
  return sequelize.define(
    'assignments',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_by: Sequelize.INTEGER,
      updated_by: Sequelize.INTEGER
    },
    { sequelize, timestamp: true }
  );
};
