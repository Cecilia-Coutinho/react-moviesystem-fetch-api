import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import {
  Title
} from './PeopleList';
import { memo } from "react";

const GenresList = ({ genres, title }) => {

   // Check if there are no genres available
  if (genres.length === 0) {
    return <div>
      <CustomTitle>{title}</CustomTitle>
      <p>No genres found for this person.</p>
    </div>;
  }

  // display person genres list
  return (
    <div>
      <CustomTitle>{title}</CustomTitle>
      <GenresListContainer>
        {genres.map((genre, index) => {
          return (
            <GenresStyled key={`genre_${index}`}>
              <UlStyled>
                <Tag>{genre}</Tag>
              </UlStyled>
            </GenresStyled>
          );
        })}
      </GenresListContainer>
    </div>
  );
}

export default memo(GenresList);

// CustomTitle component with some additional styles
const CustomTitle = styled(Title)`
  display: flex;
  justify-content: center;
  background-color:unset;
  margin: 0 auto;
`;

// Custom container for the genres list
const GenresListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;
  max-width: 600px;
  margin 0 auto;
`;

const GenresStyled = styled.div`
  display: flex;
`;

const UlStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Styling for each genre tag
const Tag = styled.li`
  justify-content: center;
  width: 120px;
  background-color: var(--color-secondary-3);
  color: var(--color-primary-5);
  padding: 5px 8px;
  border-radius: 4px;
  margin: 8px;
  text-align: center;
`;
