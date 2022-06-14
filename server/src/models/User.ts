import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    GoogleId: String

})
export default mongoose.model('User', userSchema)