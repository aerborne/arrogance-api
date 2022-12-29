export default class ModelManager {
  constructor() {
    this.models = {};
    this.definitions = {};
    this.orm = null;
  }

  setORM = async (orm) => {
    this.orm = orm;
  };

  getORM = async (orm) => {
    return this.orm;
  };

  getModels = async () => {
    return this.models;
  };

  addDefinition = async (definition) => {
    const { name } = definition;
    if (!name) {
      throw new Error(`Definition has no name supplied`);
    }

    if (!!this.definitions[name]) {
      throw new Error(`Model ${definition.name} already exists`);
    }
    this.definitions[name] = definition;

    this.models[name] = await this.createModel(definition);
    const database = await this.getORM();
  };

  createModel = async (definition) => {
    const { name, define, options } = definition;
    const { classMethods, instanceMethods } = options;
    const database = await this.getORM();
    const model = database.define(name, define, options);
    // if (classMethods) {
    //   await Promise.all(
    //     Object.keys(classMethods).map(async (classMethod) => {
    //       if (classMethods) {
    //         if (isFunction(classMethods[classMethod])) {
    //           this.sequelize.models[name][classMethod] =
    //             classMethods[classMethod];
    //         } else {
    //           this.sequelize.models[name][classMethod] =
    //             await this.generateSQLFunction(classMethods[classMethod]);
    //         }
    //       }
    //     })
    //   );
    // }

    return model;
  };
}
