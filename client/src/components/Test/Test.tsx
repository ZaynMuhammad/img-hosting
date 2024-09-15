import React from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';


const fetchData = async (): Promise<any> => {
    console.log('fetching data')
    // console.log(process.env.API_URL)

    const response = await fetch('http://localhost:8080')
    const data = await response.json()

    console.log("data", data);
    return data
}

function Test() {
    // const API = process.env.API_URL || 'http://localhost:8080/'
 
    const queryClient = useQueryClient();

    // Fetching data once the component is mounted, will probably need to refactor this to fetch when the component is redered?
    // Revisit
    const { data, error, isLoading } = useQuery({
        queryKey: ['test'], // Query key
        queryFn: fetchData, // Fetching function
        staleTime: Infinity, // Data will never be considered stale 
      });

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <h1>{JSON.stringify(data)}</h1>
        </div>
    );
}

export { Test };