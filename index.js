import express from 'express';
import cors from 'cors';
import { connectDatabase, sequelize } from './postgres/postgres.js'; 
import router from './view/routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Middleware to ensure the 'users' table exists
app.use(async (req, res, next) => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    
    if (!tables.includes('users')) {
      console.log('ℹ️ Users table not found, creating...');
      await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
      console.log('✅ Users table created successfully.');
    }
    next();
  } catch (error) {
    console.error('❌ Error checking/creating users table:', error.message);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});

// Routes
app.use(router);

const startServer = async () => {
  try {
    await connectDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1); 
  }
};

startServer();
