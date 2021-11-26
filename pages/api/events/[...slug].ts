import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import dbConnect from '@/utils/db-connect';
import Event from '@/models/Events';

export const getFilteredEvents = async (
  year: string,
  month: string
) => {
  const numYear = +year;
  const numMonth = +month;

  await dbConnect();

  try {
    const events = await Event.find({});

    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === numYear &&
        eventDate.getMonth() === numMonth - 1
      );
    });

    return filteredEvents;
  } catch (error) {
    return Promise.reject(error);
  }
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const [year, month] = req.query.slug as string[];

    let filteredEvents;
    try {
      filteredEvents = await getFilteredEvents(year, month);
      res.status(200).json({ success: true, data: filteredEvents });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
    if (!filteredEvents) {
      res.status(500).json({
        success: false,
        message: 'Could not find events',
      });
    }
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
