import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeam: string;
  declare homeTeamGoals: string;
  declare awayTeam: string;
  declare awayTeamGoals: string;
  declare inProgress: string;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});
Teams.hasMany(Matches, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Teams.hasMany(Matches, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Matches;
