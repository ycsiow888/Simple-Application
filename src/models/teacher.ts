import Sequelize from 'sequelize';

export const TeacherModel = (sequelize: any, type: any) => {
  return sequelize.define(
    'teachers',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      graduated_at: {
        type: Sequelize.STRING
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_by: Sequelize.INTEGER,
      updated_by: Sequelize.INTEGER
    },
    { sequelize, timestamp: true }
  );
};
