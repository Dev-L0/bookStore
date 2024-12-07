import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDB from './db/connectToDB.js';
import authRoutes from './routes/auth.routes.js';
import bookRoute from "./routes/book.routes.js";
import cartRoute from "./routes/cart.routes.js";
import paymentRoute from "./routes/payment.routes.js";
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL, // Specify the exact origin
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));

const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoute);
app.use('/api/cart', cartRoute);
app.use('/api/payment', paymentRoute);

app.listen(port,()=>{
    connectToDB(); //Connect to DB
    console.log(`Server is listening to ${port}.`)
});