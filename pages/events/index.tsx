import type { NextPage } from 'next';
import { getAllEvents } from 'data/events';
import Layout from '@/components/Layout';
import EventList from '@/components/EventList';
import EventSearch from '@/components/EventSearch';

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();
  const searchHandler = (year: string, month: string) => {
    console.log(year + month);
  };

  return (
    <Layout>
      <EventSearch onSearch={searchHandler} />
      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        All Events
      </h1>
      <EventList events={events} />
    </Layout>
  );
};

export default AllEventsPage;
