import type { GetStaticProps, NextPage } from 'next';
import type { Event } from '@/types/index';
import { getFeaturedEvents } from '@/api/events/featured';
import Layout from '@/components/Layout';
import EventList from '@/components/EventList';
import Button from '@/components/Button';
import EventSearch from '@/components/EventSearch';

type Props = {
  featuredEvents: Event[];
};

const Home: NextPage<Props> = ({ featuredEvents }) => {
  return (
    <Layout>
      <EventSearch />

      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        Featured Events
      </h1>
      <EventList events={featuredEvents} />
      <Button href="/events">EXPLORE ALL EVENTS</Button>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  const modifiedEvents = featuredEvents.map(event => ({
    ...event._doc,
    _id: event._id.toString(),
  }));

  return {
    props: { featuredEvents: modifiedEvents },
    revalidate: 1800,
  };
};

export default Home;
