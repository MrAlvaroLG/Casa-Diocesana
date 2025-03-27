"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Esta línea evita que Mongoose cree modelos duplicados
const models = mongoose_1.default.models || {};
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    phone: {
        type: String,
        required: [true, 'El número de teléfono es obligatorio'],
        validate: {
            validator: function (v) {
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
            validator: function (v) {
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
}, { timestamps: true });
// Usando esta técnica, evitamos el error de modelo duplicado
const User = models.User || mongoose_1.default.model('User', UserSchema);
exports.default = User;
