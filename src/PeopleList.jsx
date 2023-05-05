import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import { FaUser } from 'react-icons/fa'

const PersonPreviewStyled = styled.div`
  padding: 20px 16px;
  margin: 25px 0;
  border-radius: 12px;
  border: 1px solid var(--color-primary-3);
  box-shadow: 2px 4px 6px var(--color-primary-3);

  &:hover {
    background-color: var(--color-primary-3);
  }
`;

export const Title = styled.h2`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  color: var(--color-primary-1);
`;

const PersonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PersonTitle = styled.h2`
  padding: 10px 16px;
  font-weight: 400;
  font-size: 22px;
  color: var(--color-font-primary);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PersonIcon = styled(FaUser)`
  margin-right: 30px;
  font-size: 28px;
  color: var(--color-primary-3);
`;

export const StyledButton = styled.button`
  margin: 10px 10px 10px 0px;
  padding: 5px 10px;
  background-color: var(--color-primary-4);
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.3px;
  color: var(--color-primary-5);
  cursor: pointer;
`

//props ({ people, title, ...})
const PeopleList = ({ people, title }) => {

  // Sort the people array by the firstName property
  const sortedPeople = people.sort((a, b) => {
    if (a.firstName < b.firstName) {
      return -1;
    } else if (a.firstName > b.firstName) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="people-list">
      <Title>{title}</Title>

      {/*
        * outputting list
        * map to get properties from the data's list initialized in Home
        */
      }
      {sortedPeople.map((person) => (
        <PersonPreviewStyled key={person.personId}>
          <StyledLink to={`/person/${person.personId}`}>
            <PersonBox>
              <PersonTitle>
                <PersonIcon />
                {person.firstName} {person.lastName}
              </PersonTitle>
              <StyledButton>GO TO PROFILE</StyledButton>
            </PersonBox>
          </StyledLink>
        </PersonPreviewStyled>
      ))}
    </div>
  );
}

export default PeopleList;

