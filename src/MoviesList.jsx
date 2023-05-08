import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import {
  Title
} from './PeopleList';

const CustomTitle = styled(Title)`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const MoviesListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 16px;
`;

const MoviesStyled = styled.div`
  display: flex;
`;

const UlStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Tag = styled.li`
  justify-content: center;
  width: 120px;
  background-color: var(--color-secondary-4);
  color: var(--color-primary-1);
  padding: 15px 10px;
  border-radius: 4px;
  margin: 8px;
  text-align: center;
`;

const MoviesList = ({ movies, title }) => {

  if (movies.length <= 0) {
    return <div>
      <CustomTitle>{title}</CustomTitle>
      <p>No movies found for this person.</p>
    </div>;
  }
  return (
    <div>
      <CustomTitle>{title}</CustomTitle>
      <MoviesListContainer>
        {movies.map((movie) => {
          return (
            <MoviesStyled key={movie.movieId}>
              <UlStyled>
                <Tag>{movie.movieTitle} <br /> Rating: { movie.movieRating}</Tag>
              </UlStyled>
            </MoviesStyled>
          );
        })}
      </MoviesListContainer>
    </div>
  );
}

export default MoviesList;
