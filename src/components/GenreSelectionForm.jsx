import {
  StyledButton
} from './PeopleList';
import styled from 'styled-components';
import { useEffect } from "react";
import { memo } from "react";

  //form component that allows users to select a genre from a list of genres and submit the selected genre.

const GenreSelectionForm = ({ genres, setGenres, genreId, setGenreId, handleSubmit }) => {

  // Fetching genre data
  useEffect(() => {
    fetch('https://localhost:7294/api/genre')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.log(error));
  }, []);

  // Setting the genreId to the first genre in the genres array on genre data change
  useEffect(() => {
    if (genres.length > 0) {
      setGenreId(genres[0].id);
    }
  }, [genres]);


  //render the form with a dropdown genre options to add
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

// Styled component for the custom label
const LabelStyled = styled.label`
  text-align: left;
  font-weight: 600;
  color: var(--color-font-primary);
`;


