import React, { useState, useEffect } from 'react';

const MyComponent = () => {
    const apiKey = '6eb70200';
    const [moviesData, setmoviesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initialURL = `http://www.omdbapi.com/?s=Harry&apikey=${apiKey}&page=1`;
        const fetchData = async () => {
            try {
                const response = await fetch(`${initialURL}`); // Replace the URL with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setmoviesData(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Render your fetched data here */}
            {moviesData.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
}
export default MyComponent;
