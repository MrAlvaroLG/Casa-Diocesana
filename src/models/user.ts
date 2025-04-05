import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    number: string;
    userType: 'Laico' | 'Religiosa' | 'Religioso' | 'Diacono' | 'Sacerdote';
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name.'],
        trim: true,
    },
    number: {
        type: String,
        unique: true,
        required: [true, 'Please provide a number.'],
        trim: true,
    },
    userType: {
        type: String,
        enum: ['Laico', 'Religiosa', 'Religioso', 'Diacono', 'Sacerdote'],
        required: [true, 'Please specify the user type.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Validación básica
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required.'],
    },
},{   timestamps: true,   }
);

const UserModel = (mongoose.models.User || mongoose.model<IUser>('User', UserSchema)) as Model<IUser>;

export default UserModel;