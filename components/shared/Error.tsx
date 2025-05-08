'use client';

import { useEffect } from 'react';
export default function Error({ error,reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className='flex-1 pt-16 pb-16 overflow-y-auto min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4 '>
      <h1>Something went wrong. Please try again later.</h1>
      <button className='hover:text-amber-600' onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
