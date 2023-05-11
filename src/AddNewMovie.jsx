import { memo } from "react";
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import styled from 'styled-components';

const AddNewMovie = ({movie, setIsPending, id}) => {

  const [movieId, setMovieId] = useState('');

  const handleAddMovieSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);

    fetch(`https://localhost:7294/api/PersonMovie/person/${id}/movie/${movie.movieId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieId)
    }).then(() => {
      setIsPending(false);

      //FIXME: check other solution to avoid window.location.reload as a hack
      window.location.reload();
    })
  }

    return (
      <div>
        <form onSubmit={handleAddMovieSubmit}>
          <button
            type='submit'
            value={movie.movieId}
            onClick={(event) => setMovieId(event.target.value)}
          >
            <PlusButton />
          </button>
        </form>
      </div>
    );
}

export default memo(AddNewMovie);

const PlusButton = styled(FaPlus)`
  margin: 1px;
  font-size: 16px;
  color: var(--color-primary-1);
  background-color: var(--color-secondary-5);
`;
