import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside your .env file'
    );
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}


declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache as MongooseCache;
if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, 
        };
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
            return mongooseInstance;
        }).catch(error => {
            console.error("❌ Error al conectar a MongoDB:", error);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}

export default dbConnect;