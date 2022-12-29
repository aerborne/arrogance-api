import Sequelize, { Op } from "sequelize";

export default {
  name: "Permission",
  comment: "This is a permission table",
  comments: {
    fields: {
      name: "This is the permission name that will be displayed.",
      type: "This is the selection of permission type.",
      rolesPermission: "permission hasMany role permission",
      permissionId: "target for role permission",
    },
  },
  define: {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "This is the permission name that will be displayed.",
    },
    type: {
      type: Sequelize.ENUM,
      values: ["model", "query", "mutation", "subscription", "other"],
      allowNull: false,
      comment: "This is the selection of permission type.",
    },
  },
  override: {},
  relationships: [
    {
      type: "hasMany",
      model: "RolePermission",
      name: "roles",
      options: {
        as: "roles",
        sourceKey: "id",
        foreignKey: "permissionId",
      },
    },
  ],
  options: {
    tableName: "permissions",
    indexes: [
      {
        unique: true,
        fields: ["name", "type"],
      },
      {
        fields: ["name"],
      },
    ],

    hooks: {},
  },
};
