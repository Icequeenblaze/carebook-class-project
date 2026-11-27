import 'dotenv/config';
import express from 'express'
import { connectDB } from './config/db.js';
import  authRoutes  from './routes/authRoutes.js'
import cors from "cors";

//create and configure an expressapplication
const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
}))
//connect to the MONGODB Database
await connectDB(process.env.MONGODB_URI);

app.use(express.json());

// This route handles all authentication and authorization 
app.use("/api/auth", authRoutes);

// test home route
app.get("/", (req, res) => res.json("Hello"))
app.get("/users", (req, res) => res.json("users loading..."))

// connect to the MONGODB Database
await connectDB(process.env.MONGODB_URI);

//
app.listen(PORT, () => {
    console.log(`SERVER is running on http://localhost:${PORT}`)
})