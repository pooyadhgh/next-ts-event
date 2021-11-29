import { Event } from 'types';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';

type Props = {
  event: Event;
};

const EventItem = ({
  event: { _id, image, title, date, location },
}: Props) => {
  const modifiedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
  const imageUrl = `/${image}`;
  const eventUrl = `/events/${_id}`;

  return (
    <li className="rounded shadow-xl m-4 flex overflow-hidden flex-col gap-4 sm:flex-row">
      <Link href={eventUrl} passHref>
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover cursor-pointer"
          width={750}
          height={350}
        />
      </Link>
      <div className="p-2 w-full">
        <div className="m-2">
          <Link href={eventUrl} passHref>
            <h2 className="text-lg font-semibold text-primary cursor-pointer hover:underline mb-5">
              {title}
            </h2>
          </Link>
          <time className="block mb-1">
            <i className="fas fa-calendar-alt text-tertiary pr-1"></i>{' '}
            {modifiedDate}
          </time>
          <address className="block mb-1">
            <i className="fas fa-map-marker-alt text-tertiary pr-1"></i>{' '}
            {location}
          </address>
        </div>
      </div>
      <div className="flex flex-col p-1 items-center justify-end m-2">
        <Button href={eventUrl}>DETAILS</Button>
      </div>
    </li>
  );
};

export default EventItem;
