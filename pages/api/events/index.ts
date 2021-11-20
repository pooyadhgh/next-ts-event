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
  await dbConnect();

  switch (req.method) {
    case 'GET':
      {
        let events;
        try {
          events = await Event.find({});
        } catch (error) {
          res.status(500).json({ success: false, message: error });
        }
        if (!events) {
          res
            .status(500)
            .json({
              success: false,
              message: 'Could not find events',
            });
        }
        res.status(200).json({ success: true, data: events });
      }
      break;
    case 'POST': {
      const {
        title,
        description,
        location,
        date,
        image,
        isFeatured,
      } = req.body;

      const event = new Event({
        title,
        description,
        location,
        date,
        image,
        isFeatured,
      });

      try {
        const createdEvent = await event.save();
        res.status(201).json({ success: true, data: createdEvent });
      } catch (error) {
        res.status(500).json({ success: false, message: error });
      }
    }
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
