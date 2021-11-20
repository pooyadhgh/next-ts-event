import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI as string;

const connection: { isConnected: null | number } = {
  isConnected: null,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
