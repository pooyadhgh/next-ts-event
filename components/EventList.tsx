import { Event } from 'types';
import EventItem from './EventItem';

type Props = {
  events: Event[];
};

const EventList = ({ events }: Props) => {
  return (
    <ul className="w-11/12 max-w-3xl my-12 mx-auto">
      {events.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
