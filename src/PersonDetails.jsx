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

const PersonDetails = ({ personId }) => {

  const { id } = useParams();
  const { data: person, isPending: isPersonPending, error: personError } = useFetch('https://localhost:7294/api/person/' + id);
  const navigateTo = useNavigate();

  const { data: genres, isPending: isGenresPending, error: genresError } = useFetch(`https://localhost:7294/api/PersonGenre/person?personId=${id}`);

  return (
    <StyledDetails>
      {isPersonPending && <div> Loading...</div>}
      {personError && <div> {personError.message}</div>}
      {person && (
        <article>
          <Title> {person.firstName} {person.lastName}</Title>
          <p>Email: {person.email}</p>
          <div>
            {isGenresPending && <div> Loading...</div>}
            {genresError && (
              <div>
                <p>No genres found for this person.</p>
                <StyledButton>Add New Genre</StyledButton>
              </div>
            )}
            {genres && genres.length > 0 && (
              <GenresList genres={genres} title="Genre Preferences" />
            )}
            {genres && genres.length === 0 && (
              <div>
                <p>No genres found for this person.</p>
                <StyledButton>Add New Genre</StyledButton>
              </div>
            )}
          </div>
          <Link to={'/'}>
            <StyledButton>Return to Home</StyledButton>
          </Link>
        </article>
      )}
    </StyledDetails>
  );
}

export default PersonDetails;
