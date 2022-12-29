import Sequelize from "sequelize";

export default {
  name: "RolePermission",
  comment: "This is a role permission table.",
  comments: {
    fields: {
      level: "This is a selection of level of what role permission will be.",
      role: "role permisssion belongsTo role",
      permission: "roler permission belongsTo permission",
      roleId: "target for role",
      permissionId: "target for permission",
    },
  },
  define: {
    level: {
      type: Sequelize.ENUM,
      values: ["global", "self"],
      allowNull: false,
      defaultValue: "self",
      comment: "This is a selection of level of what role permission will be.",
    },
    // roleId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
    // permissionId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
  },
  override: {},
  relationships: [
    {
      type: "belongsTo",
      model: "Role",
      name: "role",
      options: {
        as: "role",
        foreignKey: "roleId",
        target: "id",
      },
    },
    {
      type: "belongsTo",
      model: "Permission",
      name: "permission",
      options: {
        as: "permission",
        foreignKey: "permissionId",
        target: "id",
      },
    },
  ],
  options: {
    tableName: "role-permissions",
    indexes: [
      {
        unique: true,
        fields: ["roleId", "permissionId"],
      },
    ],
    hooks: {},
  },
};
