"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
//import { createServer } from 'http';
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const index_1 = __importDefault(require("./index"));
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const nextPort = process.env.NEXT_PORT ? parseInt(process.env.NEXT_PORT, 10) : 3000;
const apiPort = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 3001;
// Preparar la app de Next.js
const nextApp = (0, next_1.default)({ dev, hostname, port: nextPort });
const handle = nextApp.getRequestHandler();
// Modificar este archivo para evitar el doble bind del puerto
nextApp.prepare().then(() => {
    // Configurar Express para usar Next.js como handler para rutas que no son API
    index_1.default.all('*', (req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    });
    // No inicies el servidor Express aquí, ya se inicia en index.ts
    console.log(`> Next.js listo en http://${hostname}:${nextPort}`);
    console.log(`> API Express lista en http://${hostname}:${apiPort}`);
}).catch(err => {
    console.error('Error iniciando servidor:', err);
    process.exit(1);
});
