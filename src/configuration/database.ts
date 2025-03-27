import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async (): Promise<void> => {
    if (isConnected) {
        return;
    }

    try {
        if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI no está definido en las variables de entorno');
        }

        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        throw error;
    }
};