import {
  useParams,
  Link
} from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import styled from 'styled-components';
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

  const [genreId, setGenreId] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [genres, setGenres] = useState([]);
  const [shouldReloadGenres, setShouldReloadGenres] = useState(false);
  const { id } = useParams();
  const { data: person, isPending: isPersonPending, error: personError } = useFetch('https://localhost:7294/api/person/' + id);

  const { data: personGenres, isPending: isGenresPending, error: genresError } = useFetch(`https://localhost:7294/api/PersonGenre/person?personId=${id}`);

  useEffect(() => {
    fetch('https://localhost:7294/api/genre')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.log(error));
  }, [shouldReloadGenres]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsPending(true);

    fetch(`https://localhost:7294/api/PersonGenre/person?personId=${id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(genreId)
    }).then(() => {
      //console.log('new task added');
      setIsPending(false);
      setShouldReloadGenres(!shouldReloadGenres);
    })
  }

  const handleGenreSelect = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label> Add New Genre: </label>
          <select
            value={genreId}
            onChange={(event) => setGenreId(event.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
          <StyledButton type="submit"> + </StyledButton>
        </form>
      </div>
    );
  };

  const renderGenres = () => {
    if (isGenresPending) {
      return <div>Loading...</div>;
    }
    if (genresError) {
      return (
        <div>
          <p>No genres found for this person.</p>
          {handleGenreSelect([])}
        </div>
      );
    }
    if (personGenres && personGenres.length > 0) {
      return (
        <div>
          <GenresList genres={personGenres} title="Genre Preferences" />
          {handleGenreSelect(genres)}
        </div>
      );
    }

    if (personGenres && personGenres.length <= 0 && (
      <div>
        <p>No genres found for this person.</p>
        {handleGenreSelect([])}
      </div>
    ))
    return (
      <div>
        <p>No genres found for this person.</p>
        {handleGenreSelect([])}
      </div>
    );
  };

  return (
    <StyledDetails>
      {isPersonPending && <div> Loading...</div>}
      {personError && <div> {personError.message}</div>}
      {person && (
        <article>
          <Title> {person.firstName} {person.lastName}</Title>
          <p>Email: {person.email}</p>
          <div>{renderGenres()}</div>
          <Link to={'/'}>
            <StyledButton>Return to Home</StyledButton>
          </Link>
        </article>
      )}
    </StyledDetails>
  );
}

export default PersonDetails;
