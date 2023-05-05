import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import {
  Title,
  StyledButton
} from './PeopleList';

const CustomTitle = styled(Title)`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const GenresListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;
`;

const GenresStyled = styled.div`
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
  background-color: var(--color-secondary-3);
  color: var(--color-primary-5);
  padding: 5px 8px;
  border-radius: 4px;
  margin: 8px;
  text-align: center;
`;

const GenresList = ({ genres, title }) => {

  if (genres.length === 0) {
    return <div>
      <CustomTitle>{title}</CustomTitle>
      <p>No genres found for this person.</p>
    </div>;
  }

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
      <StyledButton>Add New Genre</StyledButton>
    </div>
  );
}

export default GenresList;
