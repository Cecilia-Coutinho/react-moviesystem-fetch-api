import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';

const AddMovieRating = ({ movie, id, setIsPending }) => {
  const [ratings, setRatings] = useState([]);

  const handleRatingSubmit = async (personRating) => {
    setIsPending(true);

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
      setRatings([...ratings, newRatingData]);
    })
      .catch((error) => {
        setIsPending(false);
        console.error(error);
    })
  }

  return (
    <Rating
      iconsCount={5}
      initialValue={movie.movieRating}
      allowFraction size={15}
      onClick={(personRating) =>
      handleRatingSubmit(personRating)} />
  );
}

export default AddMovieRating;
