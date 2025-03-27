import { connectToDatabase } from '@/configuration/database';
import User, { IUser } from '@/models/User';
import { FormData } from '@/app/auth/signup/validation';

interface RegistrationResponse {
    success: boolean;
    message: string;
    user?: Partial<IUser>;
    error?: unknown;
}

export async function registerUser(userData: FormData): Promise<RegistrationResponse> {
    try {
        // Conectar a la base de datos
        await connectToDatabase();
        
        // Comprobar si el usuario ya existe
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return {
                success: false,
                message: 'Este correo electrónico ya está registrado',
            };
        }

        const newUser = new User({
            name: userData.name,
            phone: userData.phone,
            userType: userData.userType,
            email: userData.email,
            password: userData.password, 
        });

        await newUser.save();

        const userWithoutPassword = { ...newUser.toObject() };
        delete userWithoutPassword.password;

        return {
            success: true,
            message: 'Usuario registrado con éxito',
            user: userWithoutPassword,
        };
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return {
            success: false,
            message: 'Error al registrar el usuario',
            error: error instanceof Error ? error.message : String(error),
        };
    }
}