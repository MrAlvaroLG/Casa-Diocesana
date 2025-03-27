"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
const connectToDatabase = async () => {
    if (isConnected) {
        console.log('=> Ya conectado a MongoDB');
        return;
    }
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI no está definido en las variables de entorno');
        }
        const db = await mongoose_1.default.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log('=> MongoDB conectado correctamente');
    }
    catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
