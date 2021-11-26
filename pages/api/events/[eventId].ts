import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import dbConnect from '@/utils/db-connect';
import Event from '@/models/Events';

export const getEventById = async (id: string) => {
  await dbConnect();
  let event;
  try {
    event = await Event.findById(id);
    return event;
  } catch (error) {
    return Promise.reject(error);
  }
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const eventId = req.query.eventId as string;

    let event;
    try {
      event = await getEventById(eventId);
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message });
    }
    if (!event) {
      res.status(500).json({
        success: false,
        message: 'Could not find events',
      });
    }
    res.status(200).json({ success: true, data: event });
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
