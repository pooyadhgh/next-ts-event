import { useRef, FormEvent } from 'react';
import Button from './Button';

type Props = {
  onSearch: (year: string, month: string) => void;
};

const EventSearch = ({ onSearch }: Props) => {
  const yearRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const selectedYear = yearRef.current?.value as string;
    const selectedMonth = monthRef.current?.value as string;
    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mt-8 mb-12 mx-auto p-4 shadow-xl rounded overflow-hidden flex flex-wrap flex-col items-baseline gap-4 sm:flex-row w-9/12 md:w-auto"
    >
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <label htmlFor="year" className="font-semibold block my-1 mx-2">
          Year
        </label>
        <select
          name="year"
          id="year"
          className="rounded shadow px-3 py-1 border border-quaternary border-opacity-30 outline-none focus:border-opacity-100 block w-full"
          ref={yearRef}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <label htmlFor="month" className="font-semibold block my-1 mx-2">
          Month
        </label>
        <select
          name="month"
          id="month"
          className="rounded shadow px-3 py-1 border border-quaternary border-opacity-30 outline-none focus:border-opacity-100 block w-full "
          ref={monthRef}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <Button>SEARCH</Button>
      </div>
    </form>
  );
};

export default EventSearch;
