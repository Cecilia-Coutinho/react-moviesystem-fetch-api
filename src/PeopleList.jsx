import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import { FaUser } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";

//props ({ people, title, ...})
const PeopleList = ({ people, title }) => {

  // Sort the people array by the firstName property
  const sortedPeople = people.slice().sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );
  const [search, setSearch] = useState('');

  const filteredSearch = search.length > 0
    ? sortedPeople.filter(person => `${person.firstName} ${person.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()))
    : []

  return (
    <div className="people-list" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Title>{title}</Title>
      <div>
        <input
          name="search"
          type="text"
          placeholder="Search..."
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {/*
        * outputting list
        * map to get properties from the data's list initialized in Home
        */
      }
      {search.length > 0 ? (
        <div>
          {filteredSearch.map((person) => (
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
        </div>) : (
          <div>
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
        )}
    </div>
  );
}

export default PeopleList;

export const Title = styled.h2`
  margin: 40px 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: left;
  color: var(--color-primary-1);
    background-color: var(--color-primary-5);
    padding: 10px 25px;
      border-radius: 5px;
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

const PersonIcon = styled(FaUser)`
  margin-right: 30px;
  font-size: 28px;
  color: var(--color-primary-3);
`;

const PersonPreviewStyled = styled.div`
  padding: 20px 16px;
  margin: 25px 0;
  border-radius: 12px;
  border: 1px solid var(--color-primary-3);
  box-shadow: 2px 4px 6px var(--color-primary-3);

  &:hover {
    background-color: var(--color-primary-3);

    ${PersonIcon} {
      color: var(--color-primary-5);
    }
    }
  }
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


