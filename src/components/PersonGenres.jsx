import GenreSelectionForm from "./GenreSelectionForm";
import GenresList from "./GenresList";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import {
  PStyled
} from "./PersonMovies";
import styled from "styled-components";

const PersonGenres = ({ setIsPending, id }) => {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');
  const { data: personGenres, isPending: isGenresPending, error: genresError } = useFetch(`https://localhost:7294/api/personGenre/person?personId=${id}`);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsPending(true);

    fetch(`https://localhost:7294/api/personGenre/person?personId=${id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(genreId)
    }).then(() => {
      setIsPending(false);

      //FIXME: check other solution to avoid window.location.reload instead of using the hack window.location.reload()
      window.location.reload();
    })
  }

  if (isGenresPending) {
    return <div>Loading...</div>;
  }
  if (genresError) {
    return (
      <div>
        <P>No genres found for this person.</P>
        <GenreSelectionForm
          genres={genres}
          setGenres={setGenres}
          genreid={genreId}
          setGenreId={setGenreId}
          handleSubmit={handleSubmit} />
      </div>
    );
  }
  if (personGenres && personGenres.length > 0) {
    return (
      <div>
        <GenresList genres={personGenres} title="Genre Preferences" />
        <GenreSelectionForm
          genres={genres}
          setGenres={setGenres}
          genreid={genreId}
          setGenreId={setGenreId}
          handleSubmit={handleSubmit} />
      </div>
    );
  }

  if (personGenres && personGenres.length <= 0 && (
    <div>
      <P>No genres found for this person.</P>
      <GenreSelectionForm
        genres={genres}
        setGenres={setGenres}
        genreid={genreId}
        setGenreId={setGenreId}
        handleSubmit={handleSubmit} />
    </div>
  ))
    return (
      <div>
        <P>No genres found for this person.</P>
        <GenreSelectionForm
          genres={genres}
          setGenres={setGenres}
          genreid={genreId}
          setGenreId={setGenreId}
          handleSubmit={handleSubmit} />
      </div>
    );

  return null;
}

export default PersonGenres;

const P = styled(PStyled)`
background-color: transparent;
`;