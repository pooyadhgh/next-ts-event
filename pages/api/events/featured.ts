import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import dbConnect from '@/utils/db-connect';
import Event from '@/models/Events';

export const getFeaturedEvents = async () => {
  await dbConnect();
  let events;
  try {
    events = await Event.find({ isFeatured: true });
    return events;
  } catch (error) {
    return Promise.reject(error);
  }
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    let events;
    try {
      events = await getFeaturedEvents();
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message });
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
