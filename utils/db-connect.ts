import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }

    // Use new db connection
    await mongoose.connect(
      MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      } as ConnectOptions,
      () => console.log('Connected to DB')
    );
    return handler(req, res);
  };

export default dbConnect;
