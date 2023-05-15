import MoviesList from "./MoviesList";
import useFetch from "./useFetch";
import styled from 'styled-components';
import {
  CustomTitle
} from './MoviesList';

const PersonMovies = ({ id }) => {

  const { data: personMovies, isPending: isPersonMoviePending, error: personMoviesError } = useFetch(`https://localhost:7294/api/movies/${id}`);

  //print loading
  if (isPersonMoviePending) {
    return <div style={{ color: "var(--color-primary-5)" }}>Loading...</div>;
  }

  //print error
  if (personMoviesError) {
    return (
      <div>
        <CustomTitle>Movies Preferences</CustomTitle>
        <PStyled>No movies found for this person.</PStyled>
      </div>
    );
  }

  //print person movies section
  if (personMovies && personMovies.length > 0) {
    return (
      <div>
        <MoviesList movies={personMovies} title="Movies Preferences" showOverviewCondition={false}
          showAddMovieCondition={false}
          showAddRatingCondition={true}
        />
      </div>
    );
  }

  //no movies found for the person
  if (personMovies && personMovies.length === 0)
    return (
      <div>
        <CustomTitle>Movies Preferences</CustomTitle>
        <PStyled>No movies found for this person.</PStyled>
      </div>
    );

  // Return null if none of the conditions are met
  return null;
}

export default PersonMovies;

export const PStyled = styled.p`
  margin: 40px 0 10px 0;
  text-align: center;
  padding: 20px 15px;
  background-color: var(--color-primary-3);
  color: var(--color-primary-1);
  font-size: 18px;
  font-weight: 400;
  border-radius: 5px;
`;
