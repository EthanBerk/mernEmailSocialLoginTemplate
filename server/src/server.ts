import dotenv from "dotenv-flow"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import * as process from "process";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import {Google as GoogleStrategy} from "./authentication/strategies";
import passportConfig from "./authentication/passportConfig";
import authRoute from "./routes/auth.route";


//middleware
const app = express();
app.use(express.json())
app.use(cors({ origin: "|||||||||", credentials: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.SCOUT_DB_URI, {}, (err) => {
    if (err) throw err;
    console.log("Connected to mongoose")
})

passportConfig(passport);

app.use("/auth", authRoute);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`))