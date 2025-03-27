import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/configuration/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Conectamos a la base de datos
    await connectToDatabase();
    
    // Extraemos los datos del cuerpo de la petición
    const userData = await request.json();
    
    // Comprobamos si el email ya existe
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Este correo electrónico ya está registrado' 
        }, 
        { status: 400 }
      );
    }
    
    // Hasheamos la contraseña (opcional en desarrollo, OBLIGATORIO en producción)
    // Instala bcryptjs: npm install bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Creamos el nuevo usuario con la contraseña hasheada
    const newUser = new User({
      name: userData.name,
      phone: userData.phone,
      userType: userData.userType,
      email: userData.email,
      password: hashedPassword
    });
    
    try {
      // Intentamos guardar el usuario
      await newUser.save();
      
      // Si llegamos aquí, la validación del modelo pasó correctamente
      return NextResponse.json(
        { 
          success: true, 
          message: 'Usuario registrado con éxito' 
        }, 
        { status: 201 }
      );
    } catch (error: any) {
      // Si hay errores de validación de Mongoose, los formateamos
      if (error.name === 'ValidationError') {
        const errors: Record<string, string> = {};
        
        // Transformamos los errores de Mongoose a nuestro formato
        for (const field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        
        return NextResponse.json(
          { 
            success: false, 
            message: 'Error de validación', 
            errors 
          }, 
          { status: 400 }
        );
      }
      
      // Otro tipo de error
      throw error;
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error del servidor' 
      }, 
      { status: 500 }
    );
  }
}