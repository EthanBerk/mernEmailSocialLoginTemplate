import * as buffer from "buffer";
import dotenv from "dotenv-flow";
import User from "../models/User";
import {IUser} from "../models/interfaces/IUser";
import {Error} from "mongoose";


const GoogleStrategy = require('passport-google-oauth20').Strategy;

export const Google = new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "/auth/google/callback"
    },
    function (accessToken: any, refreshToken: any , profile: any, cb: any){
        User.findOne({googleId: profile.id}, async (err: Error, doc: IUser) => {
            if(err){
                return cb(err, null)
            }
            if(!doc){
                const newUser = new User({
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value
                })
                await newUser.save();
            }
        })

        cb(null, profile)
    }
)