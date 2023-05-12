import { memo } from "react";
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const AddNewMovie = ({movie, setIsPending, id}) => {

  const [movieId, setMovieId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleAddMovieSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);

    fetch(`https://localhost:7294/api/personMovie/person/${id}/movie/${movie.movieId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieId)
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then((movieIdToAdd) => {
      setIsPending(false);
      setMovieId(movieIdToAdd);
      setOpenModal(true);
    }).catch((error) => {
      setIsPending(false);
      console.error(error);
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
        <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
          <p style={{ fontSize: "16px", margin: "0 auto", padding: "20px 0px" }}>Movie Added</p>
        </Modal>
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
