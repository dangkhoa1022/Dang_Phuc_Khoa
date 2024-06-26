import mongoose from 'mongoose';

let isConnectedDB: boolean;
export const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URL as string);

		if (isConnectedDB) {
			console.log('Database already connected!');
		}

		console.log('Connect database successfully!');
		isConnectedDB = true;
		return connect;
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
