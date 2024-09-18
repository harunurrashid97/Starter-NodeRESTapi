import { createUserModel } from './userSchema.js';

export const initializeModels = (sequelize) => {
  const UserModel = createUserModel(sequelize);
  
  return {
    UserModel,
  };
};
