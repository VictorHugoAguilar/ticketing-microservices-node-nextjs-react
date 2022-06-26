import mongoose, { Schema } from "mongoose";
import { Password } from '../services/password';

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

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
});

userSchema.statics.build = (atrrs: UserAttrs) => {
    return new User(atrrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };