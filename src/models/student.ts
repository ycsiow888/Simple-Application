import Sequelize from 'sequelize';

export const StudentModel = (sequelize: any, type: any) => {
  return sequelize.define(
    'students',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      class: {
        type: Sequelize.STRING
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_by: Sequelize.INTEGER,
      updated_by: Sequelize.INTEGER
    },
    { sequelize, timestamp: true }
  );
};
