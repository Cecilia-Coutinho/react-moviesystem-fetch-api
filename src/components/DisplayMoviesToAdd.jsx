import MoviesList from "./MoviesList";
import useFetch from "./useFetch";
import {
  PStyled
} from "./PersonMovies";

const DisplayMoviesToAdd = () => {
  // Fetching movies data
  const { data: movies, isPending: isMoviesPending, error: moviesError } = useFetch(`https://localhost:7294/api/movies`);

  // If movies are still loading, display a loading message
  if (isMoviesPending) {
    return <div style={{ color: "var(--color-primary-5)" }}>Loading...</div>;
  }

  // If there was an error fetching movies, display an error message
  if (moviesError) {
    return (
      <div>
        <PStyled>Oops! Something went wrong...</PStyled>
      </div>
    );
  }

  // If movies data is available and there are movies to display, render the MoviesList component
  if (movies && movies.length > 0) {
    return (
      <div>
        <MoviesList
          movies={movies}
          title="All Movies" showOverviewCondition={false} showAddMovieCondition={true}
          showAddRatingCondition={true}
        />
      </div>
    );
  }

  // If movies data is available but there are no movies to display, show a message indicating no movies found
  if (movies && movies.length === 0) {
    return (
      <div>
        <PStyled>No movies found.</PStyled>
      </div>
    );
  }
  
  return null;
}

export default DisplayMoviesToAdd;
