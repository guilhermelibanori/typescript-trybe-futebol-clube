import ITeams from '../../Interfaces/ITeams';
import { Model, QueryInterface, DataTypes } from 'sequelize';

export default {
  up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeams>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      },
    });
  },

  down (queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};