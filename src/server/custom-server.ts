import 'dotenv/config'; 
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import app from './index';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const nextPort = process.env.NEXT_PORT ? parseInt(process.env.NEXT_PORT, 10) : 3000;
const apiPort = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 3001;

// Preparar la app de Next.js
const nextApp = next({ dev, hostname, port: nextPort });
const handle = nextApp.getRequestHandler();

// Modificar este archivo para evitar el doble bind del puerto
nextApp.prepare().then(() => {
    // Configurar Express para usar Next.js como handler para rutas que no son API
    app.all('*', (req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    });

    // No inicies el servidor Express aquí, ya se inicia en index.ts
    console.log(`> Next.js listo en http://${hostname}:${nextPort}`);
    console.log(`> API Express lista en http://${hostname}:${apiPort}`);
}).catch(err => {
    console.error('Error iniciando servidor:', err);
    process.exit(1);
});