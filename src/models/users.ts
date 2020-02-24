import Sequelize from 'sequelize';

export const UserModel = function(sequelize: any, type: any) {
  return sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: { type: Sequelize.STRING, allowNull: false },
      password: Sequelize.STRING,
      role: Sequelize.STRING,
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_by: Sequelize.INTEGER,
      updated_by: Sequelize.INTEGER
    },
    { sequelize, timestamp: true }
  );
};
