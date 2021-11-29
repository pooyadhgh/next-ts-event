import type { GetStaticProps, NextPage } from 'next';
import type { Event } from '@/types/index';
import { getAllEvents } from '@/api/events';
import Layout from '@/components/Layout';
import EventList from '@/components/EventList';
import EventSearch from '@/components/EventSearch';

type Props = {
  events: Event[];
};

const AllEventsPage: NextPage<Props> = ({ events }) => {
  return (
    <Layout title="All Events" description="All events found.">
      <EventSearch />

      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        All Events
      </h1>
      <EventList events={events} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();
  const modifiedEvents = events.map(event => ({
    ...event._doc,
    _id: event._id.toString(),
  }));

  return { props: { events: modifiedEvents }, revalidate: 1800 };
};

export default AllEventsPage;
