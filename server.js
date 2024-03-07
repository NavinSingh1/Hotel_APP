import connectDB from "./data/database.js";
import express from "express";
import bodyParser from 'body-parser';
import passport from "./auth.js";
import dotenv from 'dotenv';
dotenv.config();

// Import the routers files
import personRoutes from './routes/personRoutes.js'
import menuItemRoutes from './routes/menuItemRoutes.js'

const app = express();

// using middleWares 
app.use(bodyParser.json());

connectDB();

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get("/", function (req, res) {
    res.send("Welcome to our Hotel")
})

// use the routers
app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)

// comment added for testing purpose
app.listen(4000, () => {
    console.log("Server is working on PORT: 4000")
})