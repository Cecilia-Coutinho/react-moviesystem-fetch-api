import MoviesList from "./MoviesList";
import useFetch from "./useFetch";
import {
  PStyled
} from "./PersonMovies";

const DisplayMoviesToAdd = () => {
  const { data: movies, isPending: isMoviesPending, error: moviesError } = useFetch(`https://localhost:7294/api/movies`);

  if (isMoviesPending) {
    return <div style={{ color: "var(--color-primary-5)" }}>Loading...</div>;
  }
  if (moviesError) {
    return (
      <div>
        <PStyled>Oops! Something went wrong...</PStyled>
      </div>
    );
  }
  if (movies && movies.length > 0) {
    return (
      <div>
        <MoviesList movies={movies} title="All Movies" showOverviewCondition={false} showAddMovieCondition={true} />
      </div>
    );
  }


  if (movies && movies.length === 0)
    return (
      <div>
        <PStyled>No movies found.</PStyled>
      </div>
    );

  return null;
}

export default DisplayMoviesToAdd;
