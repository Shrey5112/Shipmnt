import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

connectDB();

app.use(bodyParser.json());
app.use('/api', emailRoutes);

export default app;
