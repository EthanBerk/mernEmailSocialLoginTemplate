import * as buffer from "buffer";
import dotenv from "dotenv-flow";
dotenv.config()

const GoogleStrategy = require('passport-google-oauth20').Strategy;

export const Google = new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "/auth/google/callback"
    },
    function (accessToken: any, refreshToken: any , profile: any, cb: any){
        console.log(profile)
        cb(null, profile)
    }
)