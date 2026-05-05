import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET() {
	try {
		await dbConnect();

		const readyState = mongoose.connection.readyState;
		const dbName = mongoose.connection.name;

		let pingOk = false;
		try {
			if (mongoose.connection.db) {
				const pingResult = await mongoose.connection.db.admin().ping();
				pingOk = pingResult?.ok === 1;
			}
		} catch {
			pingOk = false;
		}

		return Response.json(
			{
				success: true,
				readyState,
				dbName,
				pingOk,
			},
			{ status: 200 }
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : "DB connection failed";
		return Response.json(
			{
				success: false,
				message,
			},
			{ status: 500 }
		);
	}
}
