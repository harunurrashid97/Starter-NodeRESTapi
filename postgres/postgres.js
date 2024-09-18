import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { createUserModel } from '../model/userSchema.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST | 'localhost',
    dialect: process.env.DB_DIALECT,
  }
);

const UserModel = createUserModel(sequelize);


const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to the database has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    throw error;
  }
};

export { connectDatabase, UserModel, sequelize }; 
