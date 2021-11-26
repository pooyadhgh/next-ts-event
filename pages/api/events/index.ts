import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import type { Event as eventType } from '@/types/index';
import dbConnect from '@/utils/db-connect';
import Event from '@/models/Events';

export const getAllEvents = async () => {
  await dbConnect();
  let events;
  try {
    events = await Event.find({});
    return events;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postEvent = async ({
  title,
  description,
  location,
  date,
  image,
  isFeatured,
}: eventType) => {
  await dbConnect();

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
    return createdEvent;
  } catch (error) {
    return Promise.reject(error);
  }
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      {
        let events;
        try {
          events = await getAllEvents();
          res.status(200).json({ success: true, data: events });
        } catch (error: any) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
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

      try {
        const createdEvent = await postEvent({
          title,
          description,
          location,
          date,
          image,
          isFeatured,
        });

        res.status(201).json({ success: true, data: createdEvent });
      } catch (error: any) {
        res
          .status(500)
          .json({ success: false, message: error.message });
      }
    }
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
