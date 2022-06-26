import mongoose, { Schema } from "mongoose";

// An interface that describes the properties that
// are required to create new User
interface UserAttrs {
    email: string;
    password: string;
}
// An interface that describe the properties that 
// a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}
// An interface that describe tha propeties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (atrrs: UserAttrs) => {
    return new User(atrrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };