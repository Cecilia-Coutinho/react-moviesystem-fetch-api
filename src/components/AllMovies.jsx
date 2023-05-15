import DisplayMoviesToAdd from "./DisplayMoviesToAdd";
import {
  useParams,
  Link
} from "react-router-dom";
import {
  StyledButton
} from './PeopleList';
import {
  StyledArticle
} from './PersonDetails';
import styled from "styled-components";

const AllMovies = () => {
  const { id } = useParams();

  return (
    <StyledArticle>
      <DisplayMoviesToAdd />

      <LinkButtons>
        <Link to={`/person/${id}`}>
          <StyledButton>Go to your Profile</StyledButton>
        </Link>
        <Link to={'/'}>
          <StyledButton>Return to Home</StyledButton>
        </Link>
      </LinkButtons>
    </StyledArticle>
  );
}

export default AllMovies;

const LinkButtons = styled.div`
  margin: 30px 0;
  display: flex;
  gap: 45px
`;
