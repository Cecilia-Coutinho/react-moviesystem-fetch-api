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

const StyledDetails = styled.div`
  margin: 20px 0;
  font-weight: 600;
`;

const PersonDetails = () => {

  const { id } = useParams();
  const { data: person, isPending, error } = useFetch('https://localhost:7294/api/person/' + id);
  const navigateTo = useNavigate();

  const handleDeleteClick = () => {
    fetch('https://localhost:7294/api/person/' + id, {
      method: 'DELETE',
    }).then(() => {
      navigateTo('/');
    });
  }

  return (
    <StyledDetails>
      {isPending && <div> Loading...</div>}
      {error && <div> {error}</div>}
      {person && (
        <article>
          <Title> {person.firstName} {person.lastName}</Title>
          <p>Email: {person.email}</p>
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
