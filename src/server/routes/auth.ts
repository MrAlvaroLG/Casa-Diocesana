import express from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../../models/User';

const router = express.Router();

// Controlador para registro de usuarios
const signupHandler: express.RequestHandler = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la petición
    const { name, phone, userType, email, password } = req.body;

    // Comprobar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Este correo electrónico ya está registrado'
      });
      return;
    }

    // Crear hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear instancia del nuevo usuario
    const newUser = new User({
      name,
      phone,
      userType,
      email,
      password: hashedPassword
    });

    // Guardar usuario en la base de datos
    const savedUser = await newUser.save();

    // Preparar objeto de respuesta sin la contraseña
    const responseUser = savedUser.toObject();
    delete responseUser.password;

    res.status(201).json({
      success: true,
      message: 'Usuario registrado con éxito',
      user: responseUser
    });
    return;
  } catch (err) {
    // Manejar diferentes tipos de errores
    if (err instanceof mongoose.Error.ValidationError) {
      // Errores de validación de Mongoose
      const validationErrors: Record<string, string> = {};
      
      Object.keys(err.errors).forEach(key => {
        validationErrors[key] = err.errors[key].message;
      });
      res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: validationErrors
      });
      return;
    } 
    res.status(500).json({
      success: false,
      message: 'Error al registrar el usuario'
    });
    return;
  }
};

// Registrar la ruta
router.post('/signup', signupHandler);

export default router;