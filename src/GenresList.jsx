import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import {
  Title
} from './PeopleList';

const GenresListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
  background-color: #ccc;
  color: #fff;
  padding: 5px 8px;
  border-radius: 4px;
  margin: 8px;
  text-align: center;
`;

const GenresList = ({ genres, title }) => {

  return (
    <div>
      <Title>{title}</Title>
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

export default GenresList;
