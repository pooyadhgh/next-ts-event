import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import type { Event } from '@/types/index';
import Image from 'next/image';
import { getEventById } from '@/api/events/[eventId]';
import { getAllEvents } from '@/api/events';
import Layout from '@/components/Layout';

type Props = {
  event: Event;
};

const EventDetailPage: NextPage<Props> = ({ event }) => {
  if (!event) {
    return (
      <Layout title="404 Not Found">
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
    <Layout title={title} description={description}>
      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        {title}
      </h1>
      <section className="flex flex-col w-full mx-auto my-12 md:w-7/12 lg:w-6/12">
        <Image
          src={imageUrl}
          alt={title}
          className="rounded shadow-sm object-cover"
          width={750}
          height={450}
        />
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

export const getStaticProps: GetStaticProps = async context => {
  const eventId = context?.params?.eventId as string;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: { event: { ...event._doc, _id: event._id.toString() } },
    revalidate: 1800,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();

  const paths = events.map((event: Event) => ({
    params: { eventId: event?._id?.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default EventDetailPage;
