import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import dbConnect from 'utils/db-connect';
import Event from 'models/Events';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const [year, month] = req.query.slug as string[];
    const numYear = +year;
    const numMonth = +month;

    await dbConnect();
    let events;
    try {
      events = await Event.find({});
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
    if (!events) {
      res.status(500).json({
        success: false,
        message: 'Could not find events',
      });
    }

    let filteredEvents = events?.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === numYear &&
        eventDate.getMonth() === numMonth - 1
      );
    });

    res.status(200).json({ success: true, data: filteredEvents });
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
