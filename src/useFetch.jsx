import { useState, useEffect } from "react";

//custom hook
const useFetch = (url) => {

  //outputting list
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true); //to set loading status
  const [error, setError] = useState(null);

  //example how to use the fetch api
  useEffect(() => {

    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(response => {
        if (!response.ok) {
          throw Error('Could not fetch the data for that resource.');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setIsPending(false);
          setError(err.message); //catch any kind of error
        }
      })

    return () => abortCont.abort();
  }, [url]); //url as a dependency if the url changes it will be re-rendered

  return { data, isPending, error };
}

export default useFetch;
