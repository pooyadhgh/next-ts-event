/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import type { Event } from 'types';
import { useRouter } from 'next/router';
import { getEventById } from 'data/events';
import Layout from '@/components/Layout';

const EventDetailPage: NextPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <Layout>
        <h1 className="text-center text-2xl font-semibold text-primary mt-1">
          No Evnet Found
        </h1>
      </Layout>
    );
  }

  const { image, title, location, date, description } = event;
  const imageUrl = `/${image}`;
  const modifiedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });

  return (
    <Layout>
      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        {title}
      </h1>
      <section className="flex flex-col w-full mx-auto my-12 md:w-7/12 lg:w-6/12">
        <img src={imageUrl} alt={title} className="rounded shadow-sm" />
        <div className="flex flex-col my-6 gap-4 p-1">
          <time className="block">
            <i className="fas fa-calendar-alt text-tertiary pr-1"></i>{' '}
            {modifiedDate}
          </time>
          <address className="block">
            <i className="fas fa-map-marker-alt text-tertiary pr-1"></i>{' '}
            {location}
          </address>
        </div>
        <div className="w-full">
          <p>{description}</p>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetailPage;
