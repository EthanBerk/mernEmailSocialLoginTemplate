import passport, {PassportStatic} from "passport";
import User from "../models/User.model";
import {IMongoDBUser} from "../models/interfaces/user";
import {Google} from "./strategies";

export default (passport: PassportStatic) => {
    // used to serialize the user for the session
    passport.serializeUser(function(user:any, done:any) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id:any, done:any) {
        User.findById(id, (err: Error, doc: IMongoDBUser) => {
            return done(null, doc);
        })
    });
    passport.use(Google)
}