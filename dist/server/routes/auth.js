"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../../models/User"));
const router = express_1.default.Router();
// Controlador para registro de usuarios
const signupHandler = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la petición
        const { name, phone, userType, email, password } = req.body;
        // Comprobar si el correo electrónico ya está registrado
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'Este correo electrónico ya está registrado'
            });
            return;
        }
        // Crear hash de la contraseña
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Crear instancia del nuevo usuario
        const newUser = new User_1.default({
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
    }
    catch (err) {
        // Manejar diferentes tipos de errores
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            // Errores de validación de Mongoose
            const validationErrors = {};
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
exports.default = router;
