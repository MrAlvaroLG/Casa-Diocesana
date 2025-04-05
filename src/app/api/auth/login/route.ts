import { NextResponse } from 'next/server';      
import dbConnect from '@/lib/database/mongodb'; 
import UserModel from '@/models/user';        
import bcrypt from 'bcryptjs';      

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'El correo electrónico y la contraseña son requeridos' },
                { status: 400 } 
            );
        }

        console.log(`Buscando usuario con email: ${email}`);
        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log(`Usuario con email ${email} no encontrado.`);
            return NextResponse.json(
                { success: false, message: 'Credenciales inválidas' }, 
                { status: 401 } 
            );
        }

        console.log(`Comparando contraseña para el usuario ${email}`);
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordMatch) {
            console.log(`Contraseña incorrecta para el usuario ${email}`);
            return NextResponse.json(
                { success: false, message: 'Credenciales inválidas' }, 
                { status: 401 }
            );
        }

        console.log(`Login exitoso para el usuario ${email}`);

        const userResponse = {
            _id: user._id, 
            name: user.name,
            email: user.email,
            number: user.number,
            userType: user.userType,
            createdAt: user.createdAt, 
            updatedAt: user.updatedAt,
        };

        return NextResponse.json(
            {
                success: true,
                message: 'Inicio de sesión exitoso',
                data: userResponse
            },
            { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error en API Login:", error.message);
        } else {
            console.error("Error en API Login:", error);
        }
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 } 
        );
    }
}