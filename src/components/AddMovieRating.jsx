import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';

const AddMovieRating = ({ movie, id, setIsPending }) => {
  const [ratings, setRatings] = useState([]);

   // handle the submission of a rating for a movie
  const handleRatingSubmit = async (personRating) => {
    setIsPending(true);

     // Send a POST request to the server with the personId, movieId, and rating data
    fetch(`https://localhost:7294/api/personMovie/movierating?personId=${id}&movieId=${movie.movieId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personRating)
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then((newRatingData) => {
      setIsPending(false);
      // Update the ratings state with the added rating
      setRatings([...ratings, newRatingData]);
    })
      .catch((error) => {
        setIsPending(false);
        console.error(error);
    })
  }

  return (
     // Render a star rating component
    <Rating
      iconsCount={5}
      initialValue={movie.movieRating}
      allowFraction size={15}
      onClick={(personRating) =>
      handleRatingSubmit(personRating)} />
  );
}

export default AddMovieRating;
