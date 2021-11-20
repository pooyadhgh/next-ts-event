import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import dbConnect from '@/utils/db-connect';
import Event from '@/models/Events';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    await dbConnect();
    let events;
    try {
      events = await Event.find({ isFeatured: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
    if (!events) {
      res.status(500).json({
        success: false,
        message: 'Could not find events',
      });
    }
    res.status(200).json({ success: true, data: events });
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
