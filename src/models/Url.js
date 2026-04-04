import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Url = sequelize.define("Url", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  shortCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  longUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Url;
