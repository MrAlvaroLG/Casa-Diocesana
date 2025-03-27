"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Cargar variables de entorno PRIMERO
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const database_1 = require("../configuration/database");
const auth_1 = __importDefault(require("./routes/auth"));
// Configuración de variables de entorno
const API_PORT = process.env.API_PORT || 3001;
// Inicializar aplicación Express
const app = (0, express_1.default)();
// Middleware básico
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)({
    contentSecurityPolicy: true, // Deshabilitado para desarrollo, habilitar en producción
}));
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Conectar a MongoDB
(0, database_1.connectToDatabase)()
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));
// Rutas API
app.use('/api/auth', auth_1.default);
// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Servidor Express funcionando correctamente' });
});
// Manejador de errores (necesita 4 parámetros obligatoriamente)
app.use((err, _req, res) => {
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
exports.default = app;
