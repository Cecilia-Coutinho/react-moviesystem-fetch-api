import {
  useParams,
  Link
} from "react-router-dom";
import { useState} from "react";
import useFetch from "./useFetch";
import styled from 'styled-components';
import {
  Title,
  StyledButton
} from './PeopleList';
import PersonGenres from "./PersonGenres";
import PersonMovies from "./PersonMovies";
import AddPersonMovie from "./AddPersonMovie";

const PersonDetails = () => {
  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();
  const { data: person, isPending: isPersonPending, error: personError } = useFetch('https://localhost:7294/api/person/' + id);

  return (
    <StyledDetails>
      {isPersonPending && <div> Loading...</div>}
      {personError && <div> {personError.message}</div>}
      {person && (
        <StyledArticle>
          <Title> {person.firstName} {person.lastName}</Title>
          <p>Email: {person.email}</p>
          <StyledGenresBox>
            <PersonGenres setIsPending={setIsPending} id={id} />
          </StyledGenresBox>
          <div>
          <PersonMovies id={id} />
          </div>
          <div>
            <AddPersonMovie />
          </div>
          <Link to={'/'}>
            <StyledButton>Return to Home</StyledButton>
          </Link>
        </StyledArticle>
      )}
    </StyledDetails>
  );
}

export default PersonDetails;

const StyledDetails = styled.div`
  margin: 0 auto;
  font-weight: 600;

  /* solid background */
  background: rgb(0, 212, 255);

  /* gradient background*/
  background: linear-gradient(45deg, rgba(0, 212, 255, 1) 0%, rgba(11, 3, 45, 1) 100%);

  filter: brightness(100%) grayscale(30%);

  /* photo background */
  background-image: url(https://images.unsplash.com/photo-1478720568477-152d9b164e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0NDY2OTl8MHwxfGFsbHx8fHx8fHx8fDE2ODM3MTE3OTc&ixlib=rb-4.0.3&q=80&w=1080);
  background-size: cover;
  background-position: center;

  select {
    width: 200px;
    padding: 6px 10px;
    outline: none;
    border: 1px solid var(--color-primary-3);
    font-size: 14px;
    margin: 40px 10px;
  }

  form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  p {
      color: var(--color-primary-5);
  }
`;

const StyledArticle = styled.article`
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledGenresBox = styled.div`
  background-color: var(--color-primary-5);
    background-color: rgba(231, 234, 239, 0.8);
    width: 100%;
  padding: 10px 25px;
  margin-top: 30px;
`;

