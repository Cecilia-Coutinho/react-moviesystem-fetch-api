import {
  StyledButton
} from './PeopleList';
import styled from 'styled-components';
import { useEffect } from "react";
import { memo } from "react";

const GenreSelectionForm = ({ genres, setGenres, genreId, setGenreId, handleSubmit }) => {

  useEffect(() => {
    fetch('https://localhost:7294/api/genre')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (genres.length > 0) {
      setGenreId(genres[0].id);
    }
  }, [genres]);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <LabelStyled> Add New Genre: </LabelStyled>
        <select
          key={genreId}
          value={genreId}
          onChange={(event) => setGenreId(event.target.value)}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <StyledButton type="submit"> + </StyledButton>
      </form>
    </div>
  );
}

export default memo(GenreSelectionForm);

const LabelStyled = styled.label`
  text-align: left;
  font-weight: 600;
  color: var(--color-font-primary);
`;


