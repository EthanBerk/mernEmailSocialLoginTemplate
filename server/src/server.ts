import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv-flow"
import * as process from "process";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import {Google as GoogleStrategy} from "./authentication/strategies";

dotenv.config()

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

app.get("/", (req, res) => {
    res.send("Helllo WOlrd");
})
mongoose.connect(process.env.SCOUT_DB_URI, {}, (err) => {
    if (err) throw err;
    console.log("Connected to mongoose")
})
// used to serialize the user for the session
passport.serializeUser(function(user:any, done:any) {
    done(null, user);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(user:any, done:any) {
   done(null, user)
});

passport.use(GoogleStrategy);

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:"/login"}),
    (req, res) => {
        res.redirect('/');
    }
    )
app.get('/getUser', (req, res) => {
    res.send(req.user);
})

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`))