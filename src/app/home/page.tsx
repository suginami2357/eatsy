'use client';

import React from 'react';
import useSWR from 'swr';
import { useFetchRestaurants } from '~/hooks/fetch/useFetchRestaurants';

  
const HomePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const { data, isLoading,error } = useSWR('/api/restaurants', fetcher); 

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {data, isLoading,error}= useFetchRestaurants()

console.log(data)

if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            aaa
            {/* <div>{data}</div> */}
        </div>
    );
};

export default HomePage;

