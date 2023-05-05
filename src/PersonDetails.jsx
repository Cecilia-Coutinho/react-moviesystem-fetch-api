import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";
import useFetch from "./useFetch";
import styled, { css } from 'styled-components';
import {
  Title,
  StyledButton
} from './PeopleList';
import GenresList from "./GenresList";

const StyledDetails = styled.div`
  margin: 20px 0;
  font-weight: 600;
`;

const PersonDetails = () => {

  const { id } = useParams();
  const { data: person, isPending: isPersonPending, error: personError } = useFetch('https://localhost:7294/api/person/' + id);
  const navigateTo = useNavigate();

  const { data: genres, isPending: isGenresPending, error: genresError } = useFetch(`https://localhost:7294/api/PersonGenre/person?personId=${id}`);

  const handleDeleteClick = () => {
    fetch('https://localhost:7294/api/person/' + id, {
      method: 'DELETE',
    }).then(() => {
      navigateTo('/');
    });
  }

  return (
    <StyledDetails>
      {isPersonPending && <div> Loading...</div>}
      {personError && <div> {error}</div>}
      {person && (
        <article>
          <Title> {person.firstName} {person.lastName}</Title>
          <p>Email: {person.email}</p>
          <div>
            {isGenresPending && <div> Loading...</div>}
            {genresError && <div> {error}</div>}
            {genres && <GenresList genres={genres} title="Genre Preferences" />}
          </div>
          <Link to={'/'}>
            <StyledButton>Return to Home</StyledButton>
          </Link>
          <StyledButton onClick={handleDeleteClick}>Delete Person</StyledButton>
        </article>
      )}
    </StyledDetails>
  );
}

export default PersonDetails;
