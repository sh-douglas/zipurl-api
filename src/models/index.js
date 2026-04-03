import sequelize from "../config/database.js";
import User from "./User.js";
import Url from "./Url.js";

User.hasMany(Url, { foreignKey: "userId", onDelete: "CASCADE" });
Url.belongsTo(User, { foreignKey: "userId" });

export { User, Url, sequelize };
