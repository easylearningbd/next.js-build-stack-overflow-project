import mongoose, {Mongoose} from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defied");
}

/// Database setup files 
interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: MongooseCache; 
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null}
}

const dbConnect = async (): Promise<Mongoose> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
         .connect(MONGODB_URI, {
            dbName:"udemydev"
         })
         .then((result) => {
            console.log("Connected to MongoDB");
            return result;
         })
         .catch((error) => {
            console.error("Error connecting to MongoDB", error);
            throw error;
         });
    }

    cached.conn = await cached.promise;
    return cached.conn;

};
export default dbConnect;
