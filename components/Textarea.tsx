/* eslint-disable react/display-name */
import { forwardRef, MutableRefObject } from 'react';

type Refs = HTMLTextAreaElement;

type Props = {
  className?: string;
  rows?: number;
  id: string;
  placeholder?: string;
  label?: string;
  ref?: MutableRefObject<null>;
};

const Input = forwardRef<Refs, Props>(
  ({ className = '', rows, id, placeholder, label }, ref) => {
    return (
      <>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-6"
          htmlFor={id}
        >
          {label}
        </label>
        <textarea
          id={id}
          placeholder={placeholder}
          className={`mt-2 block w-full p-2 rounded-md border-2 border-gray-200 shadow-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:ring-opacity-50 outline-none  ${className}`}
          ref={ref}
          rows={rows}
        />
      </>
    );
  }
);

export default Input;
