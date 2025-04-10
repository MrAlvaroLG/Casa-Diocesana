import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb'; 
import UserModel from '@/models/user';        
import bcrypt from 'bcryptjs';              
import {
    validateName,
    validateNumber,
    validateUserType,
    validateEmail,
    validatePassword,
} from '@/lib/validators/authValidation'; 
export async function POST(req: Request) {
    console.log('API Route /api/auth/signup llamada (POST)'); 

    try {
        console.log('Conectando a la base de datos...');
        await dbConnect();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('Error al conectar a la BD:', error);
        return NextResponse.json(
            { success: false, message: 'Error del servidor al conectar a la base de datos.' },
            { status: 500 }
        );
    }

    let body;
    try {
        body = await req.json();
        console.log('Datos recibidos del frontend:', body);
        const { name, number, userType, email, password, confirmPassword } = body;
        console.log('Iniciando validación en el servidor...');
        const errors: { [key: string]: string | null } = {};

        errors.nameError = validateName(name);
        errors.numberError = validateNumber(number);
        errors.userTypeError = validateUserType(userType);
        errors.emailError = validateEmail(email);
        errors.passwordError = validatePassword(password);
        if (!password) errors.passwordError = errors.passwordError || "La contraseña es obligatoria.";
        if (!confirmPassword) errors.confirmPasswordError = "La confirmación de contraseña es obligatoria."; 

        const validationErrors = Object.entries(errors)
            .filter(([, value]) => value !== null)
            .reduce((acc, [key, value]) => {
                acc[key.replace('Error', '')] = value as string; 
                return acc;
            }, {} as { [key: string]: string }); 

        if (Object.keys(validationErrors).length > 0) {
            console.log('Errores de validación encontrados:', validationErrors);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Datos inválidos. Por favor corrige los errores.',
                    errors: validationErrors, 
                },
                { status: 400 }
            );
        }
        console.log('Validación en servidor superada.');
        console.log('Verificando si el usuario ya existe (email o número)...');
        const existingUser = await UserModel.findOne({ $or: [{ email }, { number }] }).lean();
        if (existingUser) {
            console.log('Conflicto: El email o número ya está registrado.');
            const conflictField = existingUser.email === email ? 'email' : 'number';
            return NextResponse.json(
                {
                    success: false,
                    message: `El ${conflictField === 'email' ? 'correo electrónico' : 'número'} ya está registrado.`,
                    errors: { [conflictField]: `Este ${conflictField === 'email' ? 'correo electrónico' : 'número'} ya está en uso.`}
                },
                { status: 409 } 
            );
        }
        console.log('Usuario no existente, se puede proceder.');
        console.log('Hasheando la contraseña...');
        const salt = await bcrypt.genSalt(10); 
        const passwordHash = await bcrypt.hash(password, salt); 
        console.log('Contraseña hasheada.');

        console.log('Creando el usuario en la base de datos...');
        const newUser = await UserModel.create({
            name,
            number,
            userType,
            email,
            passwordHash: passwordHash, 
        });
        console.log('Usuario creado exitosamente:', newUser._id);

        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            number: newUser.number,
            userType: newUser.userType,
            createdAt: newUser.createdAt
        };

        return NextResponse.json(
            {
                success: true,
                message: 'Usuario registrado exitosamente.',
                data: userResponse,
            },
            { status: 201 }
        );

    } catch (error: unknown) { 
        console.error('¡ERROR INESPERADO EN LA API SIGNUP!:', error);

        if (error instanceof Error) {
            if (error.name === 'ValidationError') {
                return NextResponse.json(
                    { success: false, message: `Error de validación de Mongoose: ${error.message}` },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { success: false, message: 'Error interno del servidor.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Error desconocido.' },
            { status: 500 }
        );
    }
}