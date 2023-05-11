import React from 'react';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import MovieCard from './MovieCard';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import {
  StyledButton
} from './PeopleList';


const MoviesList = ({ movies, title, showOverviewCondition, showAddMovieCondition }) => {

  const [openModal, setOpenModal] = useState(false);

  const [pagination, setPagination] = useState(0);
  useEffect(() => {
    setPagination(1);
  }, [pagination]);

  return (

    <CarouselContainer>
      <CustomTitle>{title}</CustomTitle>
      <CustomCarousel
        showThumbs={false}
        showArrows={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={8000}
        showIndicators={true}
      >
        {movies.map((movie, index) => {
          return (
            <div key={movie.movieId}>
              <MovieCard
                movie={movie}
                showOverview={showOverviewCondition}
                showAddMovie={showAddMovieCondition}
              />
              <PaginationDetails>
                <p>Showing {pagination} of {movies.length} items</p>
              </PaginationDetails>
            </div>
          );
        })}
      </CustomCarousel >
      <ModalButton>
        <Button onClick={() => setOpenModal(true)}>
          SEE ALL
        </Button>
      </ModalButton>
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        {movies.map((movie, index) => {
          return (
            <div key={movie.movieId}>
              <MovieCard
                movie={movie}
                showOverview={true}
                showAddMovie={showAddMovieCondition}
              />
            </div>
          );
        })}
      </Modal>
    </CarouselContainer>
  );
}

export default MoviesList;

export const CustomTitle = styled.h2`
  margin: 0px 0 20px 0;
  color: var(--color-primary-5);
  font-size: 30px;
  padding: 40px 5px 10px 5px;
  display: flex;
  justify-content: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`;

const Button = styled(StyledButton)`
  width: 150px;
`;

const ModalButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CustomCarousel = styled(Carousel)`
  font-size: 14px;
  margin: 0 auto;
  padding: 10px;

  .carousel .control-dots {
        margin: 0;
    width: 100%;
    position: absolute;
  }

  .carousel .control-dots .dot {
  width: 12px;
  height: 12px;
  margin: 0px 5px;
  background: var(--color-primary-1);
}

.carousel .slider-wrapper {
    margin-bottom: 20px;
  }
}
`;

const PaginationDetails = styled.div`
  margin: 0 auto;
  padding: 10px 10px;
  font-weight: 600;
`;


