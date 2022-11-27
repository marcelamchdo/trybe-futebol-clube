import { DataTypes, Model } from 'sequelize';
import db from '.';

// import OtherModel from './OtherModel';

class Teams extends Model {
  // declare <campo>: <tipo>;
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
