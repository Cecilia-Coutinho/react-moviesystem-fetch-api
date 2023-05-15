import GenreSelectionForm from "./GenreSelectionForm";
import GenresList from "./GenresList";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import {
  PStyled
} from "./PersonMovies";
import styled from "styled-components";

//PersonDetails child component: Print Person Genres section

const PersonGenres = ({ setIsPending, id }) => {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');
  const { data: personGenres, isPending: isGenresPending, error: genresError } = useFetch(`https://localhost:7294/api/personGenre/person?personId=${id}`);

  // POST request to add new genre to the person's genres
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

  //print loading
  if (isGenresPending) {
    return <div>Loading...</div>;
  }

  //catch if there's an error: display the error and show the form
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

  //print list of genres with props and the form
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

  // Display message if there are no genres found for the person and show the form
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

  // Return null if none of the conditions are met
  return null;
}

export default PersonGenres;

const P = styled(PStyled)`
background-color: transparent;
`;
