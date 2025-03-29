const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const dbConnection = require("./config/dbConfig");
const resturantRoutes = require("./routes/resturant.routes");
const foodItemsRoutes = require("./routes/foodItems.route");

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());



//getting database connected

(async () => {
  await dbConnection();  
})();

// Routes setup
app.use('/api/hotel',resturantRoutes);
app.use('/api/foods',foodItemsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Server activation
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
