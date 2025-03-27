import 'dotenv/config'; // Cargar variables de entorno PRIMERO
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { connectToDatabase } from '../configuration/database';
import authRoutes from './routes/auth';

// Configuración de variables de entorno
const API_PORT = process.env.API_PORT || 3001;

// Inicializar aplicación Express
const app = express();

// Middleware básico
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: true, // Deshabilitado para desarrollo, habilitar en producción
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectToDatabase()
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas API
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Servidor Express funcionando correctamente' });
});

// Manejador de errores (necesita 4 parámetros obligatoriamente)
app.use((err: Error, _req: express.Request, res: express.Response) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
if (process.env.NODE_ENV !== 'test') {
    app.listen(API_PORT, () => {
        console.log(`Servidor Express escuchando en el puerto ${API_PORT}`);
    });
}

export default app;