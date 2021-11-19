import type { NextPage } from 'next';
import { getAllEvents } from 'data/events';
import Layout from '@/components/Layout';
import EventList from '@/components/EventList';
import EventSearch from '@/components/EventSearch';

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();

  return (
    <Layout>
      <EventSearch />

      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        All Events
      </h1>
      <EventList events={events} />
    </Layout>
  );
};

export default AllEventsPage;
