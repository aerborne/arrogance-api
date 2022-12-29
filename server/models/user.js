import Sequelize from "sequelize";

import { GraphQLString } from "graphql";

export default {
  name: "User",
  define: {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  relationships: [
    {
      type: "belongsTo",
      model: "Role",
      name: "role",
      options: {
        foreignKey: "roleId",
      },
    },
    {
      type: "hasMany",
      model: "UserAuth",
      name: "auths",
      options: {
        as: "auths",
        foreignKey: "userId",
      },
    },
  ],
  expose: {
    classMethods: {
      mutations: {
        login: {
          type: "User",
          args: {
            email: {
              type: GraphQLString,
            },
            password: {
              type: GraphQLString,
            },
          },
        },
      },
    },
  },
  options: {
    tableName: "users",
    classMethods: {
      login({ input: { amount } }, req) {
        return {
          id: 1,
          name: `reverseName${amount}`,
        };
      },
    },
    hooks: {
      beforeFind(options) {
        return options;
      },
      beforeCreate(instance, options) {
        return instance;
      },
      beforeUpdate(instance, options) {
        return instance;
      },
      beforeDestroy(instance, options) {
        return instance;
      },
    },
  },
};
