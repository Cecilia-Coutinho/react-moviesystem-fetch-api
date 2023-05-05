import { Link } from "react-router-dom";

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
      <h2>{title}</h2>

      {/*
        * outputting list
        * map to get properties from the data's list initialized in Home
        */
      }
      {sortedPeople.map((person) => (
        <div key={person.personId}>
          <Link to={`/person/${person.personId}`}>
              <h2> {person.firstName} {person.lastName}</h2>
              <button>GO TO PROFILE</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PeopleList;
