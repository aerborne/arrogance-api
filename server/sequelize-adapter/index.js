import { Sequelize } from "sequelize";
import config from "../config";
import models from "../models/index";
import ModelManager from "../model-manager/manager";

export default async function createDatabaseInstance() {
  // initialize sequelize database bind
  const database = new SequelizeAdapter(
    `${config.DATABASE_CONNECTION}://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`
  );

  const manager = new ModelManager();
  await manager.setORM(await database.getORM());

  // create models
  await Promise.all(
    Object.keys(models).map(async (modelName) => {
      const model = models[modelName];
      await manager.addDefinition(model);
      await database.createRelationships(model);
    })
  );

  // await Promise.all(
  //   Object.keys(models).map(async (modelName) => {
  //     const model = models[modelName];
  //     await database.createRelationships(model);
  //   })
  // );

  await database.initialize();
  if (config.RESET_DATABASE) {
    await database.reset();
  } else {
    await database.sync();
  }

  return manager;
}

export class SequelizeAdapter {
  constructor(config) {
    this.sequelize = new Sequelize(config);
    this.definitions = {};
    this.models = {};
  }

  initialize = async () => {
    try {
      await this.getORM().authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  getORM = () => {
    return this.sequelize;
  };

  sync = async () => {
    await this.getORM().sync();
  };

  reset = async () => {
    await this.getORM().sync({ force: true });
  };

  getModel = (modelName) => {
    return this.sequelize.models[modelName];
  };
  getModels = () => {
    return this.sequelize.models;
  };

  createRelationships = async (model) => {
    const { name, relationships } = model;
    const targetModel = this.sequelize.models[name];
    this.sequelize.models[name].relationships = relationships.map(
      (relationship) => {
        const { name, type, model: sourceModelName, options } = relationship;
        const sourceModel = this.sequelize.models[sourceModelName];
        return {
          name,
          type,
          source: sourceModelName,
          target: model,
          options,
          rel: targetModel[type](sourceModel, options),
        };
      }
    );
  };
}
