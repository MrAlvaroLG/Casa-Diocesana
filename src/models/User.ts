import mongoose, { Schema, Document } from 'mongoose';

// Esta línea evita que Mongoose cree modelos duplicados
const models = mongoose.models || {};

// Interfaz para el documento de usuario
export interface IUser extends Document {
    name: string;
    phone: string;
    userType: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
{
    name: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'] 
    },
    phone: { 
        type: String, 
        required: [true, 'El número de teléfono es obligatorio'],
        validate: {
            validator: function(v: string) {
            return /^[0-9]{8}$/.test(v);
            },
            message: 'El número de teléfono debe tener 8 dígitos'
        }
    },
    userType: { 
        type: String, 
        required: [true, 'El tipo de usuario es obligatorio'],
        enum: {
            values: ['Laico', 'Religiosa', 'Religioso', 'Diacono', 'Sacerdote'],
            message: 'Tipo de usuario no válido'
        }
    },
    email: { 
        type: String, 
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        validate: {
            validator: function(v: string) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'El formato del correo electrónico no es válido'
        }
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'] 
    }
},
{ timestamps: true }
);

// Usando esta técnica, evitamos el error de modelo duplicado
const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;