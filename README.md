# Casa Diocesana

Plataforma web de administración y reservas para Casa Diocesana de la Pastoral Juvenil.

## Características

- **Sistema de Autenticación**: Registro e inicio de sesión seguro con validación de datos.
- **Perfiles de Usuario**: Diferentes niveles de acceso según el tipo de usuario (Laico, Religiosa, etc).
- **Reservas**: Sistema para solicitar y administrar reservas de espacios.
- **Panel Administrativo**: Gestión de usuarios, reservas y configuraciones.

## Tecnologías

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Express.js, Node.js
- **Base de datos**: MongoDB con Mongoose
- **Estilos**: TailwindCSS
- **Autenticación**: bcrypt para encriptación de contraseñas

## Estructura del Proyecto

```
casa-diocesana/
├── src/
│   ├── app/              # Rutas y componentes de Next.js
│   ├── components/       # Componentes React reutilizables
│   ├── configuration/    # Configuraciones del proyecto
│   ├── models/           # Modelos de Mongoose
│   └── server/           # API Express
│       ├── routes/       # Rutas de la API
│       ├── index.ts      # Servidor Express
│       └── custom-server.ts
├── public/               # Archivos estáticos
└── tailwind.config.js    # Configuración de Tailwind CSS
```

## Instalación y Configuración

### Requisitos previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- MongoDB (local o Atlas)

### Clonación e instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/casa-diocesana.git
cd casa-diocesana

# Instalar dependencias
npm install
```

### Variables de entorno

Crea un archivo .env en la raíz del proyecto con las siguientes variables:

```bash
# MongoDB
MONGODB_URI=tu_uri_de_mongodb

# Puertos
NEXT_PORT=3000
API_PORT=3001

# Otras configuraciones
NODE_ENV=development
```

## Ejecución

### Modo desarrollo

Para ejecutar el proyecto en modo desarrollo, necesitas iniciar tanto el servidor Express como Next.js:

```bash
# Terminal 1: Iniciar el servidor Express (API)
npm run dev

# Terminal 2: Iniciar el servidor Next.js (Frontend)
npm run dev:next
```

Luego, accede a:
- Frontend: http://localhost:3000
- API: http://localhost:3001
- Endpoint de salud: http://localhost:3001/api/health

### Construcción para producción

```bash
# Construir el proyecto
npm run build

# Iniciar en modo producción
npm start
```
