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


const PersonDetails = () => {

  const [genreId, setGenreId] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const { data: person, isPending: isPersonPending, error: personError } = useFetch('https://localhost:7294/api/person/' + id);

  const { data: personGenres, isPending: isGenresPending, error: genresError } = useFetch(`https://localhost:7294/api/personGenre/person?personId=${id}`);


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

  const { data: personMovies, isPending: isPersonMoviePending, error: personMoviesError } = useFetch(`https://localhost:7294/api/movies/${id}`);


  const renderPersonMovies = () => {
    if (isPersonMoviePending) {
      return <div>Loading...</div>;
    }
    if (personMoviesError) {
      return (
        <div>
          <PStyled>No movies found for this person.</PStyled>
        </div>
      );
    }
    if (personMovies && personMovies.length > 0) {
      return (
        <div>
          <MoviesList movies={personMovies} title="Movies Preferences" showOverviewCondition={false}/>
        </div>
      );
    }

    if (personMovies && personMovies.length === 0)
      return (
        <div>
          <PStyled>No movies found for this person.</PStyled>
        </div>
      );
  };

  const { data: movies, isPending: isMoviesPending, error: moviesError } = useFetch(`https://localhost:7294/api/movies`);

  const renderAddMovies = () => {
    if (isMoviesPending) {
      return <div>Loading...</div>;
    }
    if (moviesError) {
      return (
        <div>
          <PStyled>Oops! Something went worng...</PStyled>
        </div>
      );
    }
    if (movies && movies.length > 0) {
      return (
        <div>
          <MoviesList movies={movies} title="All Movies" showOverviewCondition={false}/>
        </div>
      );
    }


    if (movies && movies.length === 0)
      return (
        <div>
          <PStyled>No movies found.</PStyled>
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
          <StyledGenresBox>{renderGenres()}</StyledGenresBox>
          <div>{renderPersonMovies()}</div>
          <div>{renderAddMovies()}</div>
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
  color: var(--color-font-primary);
`;

const StyledArticle = styled.article`
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

