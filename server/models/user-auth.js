import Sequelize from "sequelize";

export default {
  name: "UserAuth",
  define: {
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "This is the name of user auth that will be displayed.",
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "This is the type of user auth for organized identification.",
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: false,
      comment:
        "This is the token that is being generated for every user type and user.",
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
  },
  relationships: [
    {
      type: "belongsTo",
      model: "User",
      name: "user",
      options: {
        foreignKey: "userId",
        target: "id",
      },
    },
  ],
  expose: {
    classMethods: {
      mutations: {},
    },
  },
  options: {
    tableName: "user-auths",
    classMethods: {},
    hooks: {
      // beforeFind(options) {
      //   console.log({ options });
      //   return options;
      // },
      // afterFind(options) {
      //   console.log({ options });
      //   return options;
      // },
      // beforeCreate(instance, options) {
      //   return instance;
      // },
      // beforeUpdate(instance, options) {
      //   return instance;
      // },
      // beforeDestroy(instance, options) {
      //   return instance;
      // },
    },
  },
};
