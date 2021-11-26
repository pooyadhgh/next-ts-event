import type { NextPage, GetServerSideProps } from 'next';
import type { Event } from '@/types/index';
import { getFilteredEvents } from '@/api/events/[...slug]';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventList from '@/components/EventList';

type Props = {
  filteredEvents: Event[];
};

const FilteredEventsPage: NextPage<Props> = ({ filteredEvents }) => {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return (
      <Layout title="404 Not Found" className="space-y-12">
        <h2 className="text-center text-2xl font-semibold text-primary mt-1">
          Loading ...
        </h2>
      </Layout>
    );
  }

  const [year, month] = filterData as string[];
  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <Layout title="404 Not Found" className="space-y-12">
        <h2 className="text-center text-2xl font-semibold text-primary mt-1">
          Invalid Filter, Please check your values
        </h2>
        <Link href="/" passHref>
          <button className="bg-tertiary text-white font-medium hover:border-tertiary hover:bg-secondary rounded px-4 py-2">
            Go Back Home
          </button>
        </Link>
      </Layout>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Layout
        title={`Filtered Events: ${numYear}/${numMonth}`}
        className="space-y-12"
      >
        <h2 className="text-center text-2xl font-semibold text-primary mt-1">
          No events found for entered values
        </h2>
        <Link href="/" passHref>
          <button className="bg-tertiary text-white font-medium hover:border-tertiary hover:bg-secondary rounded px-4 py-2">
            Go Back Home
          </button>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout title={`Filtered Events: ${numYear}/${numMonth}`}>
      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        {`Filtered Events: ${numYear}/${numMonth}`}
      </h1>
      <EventList events={filteredEvents} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  async context => {
    const [year, month] = context?.params?.slug as string[];

    const events = await getFilteredEvents(year, month);

    const modifiedEvents = events.map(event => ({
      ...event._doc,
      _id: event._id.toString(),
    }));

    return { props: { filteredEvents: modifiedEvents } };
  };

export default FilteredEventsPage;
