import { useState, useEffect } from "react";

// Custom hook for fetching data

const useFetch = (url) => {

  //outputting list
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true); //to set loading status
  const [error, setError] = useState(null)

  // useEffect hook to perform the data fetching
  useEffect(() => {

    // Create an abort controller to handle cleanup
    const abortCont = new AbortController();

     // Fetch data from the specified URL
    fetch(url, { signal: abortCont.signal })
      .then(response => {
        if (!response.ok) {
          throw Error('Could not fetch the data for that resource.');
        }
        return response.json();
      })
      .then(data => {
        // Update the data state and set loading status to false
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          // Handle errors and set loading status to false
          setIsPending(false);
          setError(err.message); //catch any kind of error
        }
      })

     // Cleanup function to abort the fetch request when the component unmounts
    return () => abortCont.abort();
  }, [url]); //url as a dependency if the url changes it will trigger a re-fetch


  // Function to create a new person
  const createNewPerson = async (person) => {
    const abortCont = new AbortController();
    setIsPending(true);

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
      signal: abortCont.signal
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Could not fetch the data for that resource.');
        }
        setIsPending(false);
        return response.json();
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setIsPending(false);
          setError(err.message); //catch any kind of error
        }
      })
      .finally(() => abortCont.abort());
  };

  // Return the data, loading status, error, and createNewPerson function
  return { data, isPending, error, createNewPerson };
};


export default useFetch;
