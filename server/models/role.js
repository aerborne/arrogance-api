import Sequelize, { Op } from "sequelize";

export default {
  name: "Role",
  comment: "This is a role table.",
  define: {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "This is the name of the role that will be displayed.",
    },
  },
  override: {},
  relationships: [
    {
      type: "hasMany",
      model: "User",
      name: "users",
      options: {
        foreignKey: "roleId",
      },
    },
    {
      type: "hasMany",
      model: "RolePermission",
      name: "permissions",
      options: {
        as: "permissions",
        sourceKey: "id",
        foreignKey: "roleId",
      },
    },
  ],
  options: {
    tableName: "roles",
    hooks: {},
  },
};
