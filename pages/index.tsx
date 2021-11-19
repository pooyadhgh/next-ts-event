import type { NextPage } from 'next';
import { getFeaturedEvents } from 'data/events';
import Layout from '@/components/Layout';
import EventList from '@/components/EventList';
import Button from '@/components/Button';
import EventSearch from '@/components/EventSearch';

const Home: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

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

export default Home;
