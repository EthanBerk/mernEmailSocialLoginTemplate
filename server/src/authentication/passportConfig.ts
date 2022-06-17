import passport, {PassportStatic} from "passport";
import User from "../models/User.model";
import {IMongoDBUser, IUser} from "../models/interfaces/user";
import {Google} from "./strategies";

export default (passport: PassportStatic) => {
    // used to serialize the user for the session
    passport.serializeUser(function(user:IMongoDBUser, done:any) {
        done(null, user._id);
    });


    passport.deserializeUser(function(id:string, done:any) {
        User.findById(id, (err: Error, doc: IMongoDBUser) => {
            return done(null, doc);
        })
    });
    passport.use(Google)
}