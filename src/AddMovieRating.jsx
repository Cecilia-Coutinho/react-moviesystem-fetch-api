import { Rating } from 'react-simple-star-rating';

const AddMovieRating = ({ movie, id, setIsPending }) => {

  const handleRatingSubmit = (personRating) => {
    setIsPending(true);

    fetch(`https://localhost:7294/api/PersonMovie/movierating?personId=${id}&movieId=${movie.movieId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personRating)
    }).then(() => {
      setIsPending(false);
      //FIXME: check other solution to avoid window.location.reload as a hack
      window.location.reload();
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
