import mongoose from "mongoose";

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
	if (connection.isConnected === 1) {
		return;
	}

	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) {
		throw new Error("MONGODB_URI is not set. Add it to your .env.local");
	}

	try {
		const db = await mongoose.connect(mongoUri);
		connection.isConnected = db.connections[0]?.readyState;
	} catch (error) {
		connection.isConnected = 0;
		console.error("DB connection error", error);
		throw error;
	}
}

export default dbConnect;