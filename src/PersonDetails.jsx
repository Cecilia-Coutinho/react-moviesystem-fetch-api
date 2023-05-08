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
import MoviesList from "./MoviesList";

const StyledDetails = styled.div`
  margin: 0 auto;
  font-weight: 600;

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
`;
const PStyled = styled.p`
  margin: 40px 0 10px 0;
  text-align: center;
  padding: 20px 15px;
  background-color: var(--color-primary-3);
  color: var(--color-primary-1);
  font-size: 18px;
  font-weight: 400;
  border-radius: 5px;
`;

const LabelStyled = styled.label`
  text-align: left;
  font-weight: 600;
`;

const StyledArticle = styled.article`
  margin: 0 auto;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const PersonDetails = () => {

  const [genreId, setGenreId] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const { data: person, isPending: isPersonPending, error: personError } = useFetch('https://localhost:7294/api/person/' + id);

  const { data: personGenres, isPending: isGenresPending, error: genresError } = useFetch(`https://localhost:7294/api/PersonGenre/person?personId=${id}`);


  useEffect(() => {
    fetch('https://localhost:7294/api/genre')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (genres.length > 0) {
      setGenreId(genres[0].id);
    }
  }, [genres]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsPending(true);

    fetch(`https://localhost:7294/api/PersonGenre/person?personId=${id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(genreId)
    }).then(() => {
      setIsPending(false);
      window.location.reload();
    })
  }

  const handleGenreSelect = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <LabelStyled> Add New Genre: </LabelStyled>
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
          <PStyled>No genres found for this person.</PStyled>
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
        <PStyled>No genres found for this person.</PStyled>
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

  const { data: personMovies, isPending: isMoviePending, error: moviesError } = useFetch(`https://localhost:7294/api/movies/${id}`);


  const renderMovies = () => {
    if (isMoviePending) {
      return <div>Loading...</div>;
    }
    if (moviesError) {
      return (
        <div>
          <PStyled>No movies found for this person.</PStyled>
        </div>
      );
    }
    if (personMovies && personMovies.length > 0) {
      return (
        <div>
          <MoviesList movies={personMovies} title="Movies Preferences" />
        </div>
      );
    }

    if (personMovies && personMovies.length <= 0 && (
      <div>
        <PStyled>No movies found for this person.</PStyled>
      </div>
    ))
      return (
        <div>
          <p>No movies found for this person.</p>
        </div>
      );
  };


  return (
    <StyledDetails>
      {isPersonPending && <div> Loading...</div>}
      {personError && <div> {personError.message}</div>}
      {person && (
        <StyledArticle>
          <Title> {person.firstName} {person.lastName}</Title>
          <p>Email: {person.email}</p>
          <div>{renderGenres()}</div>
          <div>{renderMovies()}</div>
          <Link to={'/'}>
            <StyledButton>Return to Home</StyledButton>
          </Link>
        </StyledArticle>
      )}
    </StyledDetails>
  );
}

export default PersonDetails;
