import React from 'react';
import styled from 'styled-components';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';
import MovieCard from './MovieCard';
import { useState, useEffect } from 'react';
//import Modal from './Modal';
import {
  StyledButton
} from './PeopleList';
import ReactPaginate from 'react-paginate';


const MoviesList = ({ movies, title, showOverviewCondition, showAddMovieCondition, showAddRatingCondition }) => {

  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const pageCount = Math.ceil(movies.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (

    <Container>
      <CustomTitle>{title}</CustomTitle>
      <ListMovies
      >
        {movies.slice(offset, offset + itemsPerPage).map((movie, index) => {
          return (
            <div key={movie.movieId}>
              <MovieCard
                movie={movie}
                showOverview={showOverviewCondition}
                showAddMovie={showAddMovieCondition}
                showAddRating={showAddRatingCondition}
              />
              <PaginationDetails>
                <p>{index + 1} of {movies.length}</p>
              </PaginationDetails>
            </div>
          );
        })}
      </ListMovies >
      <StyledPaginateContainer>
        <ReactPaginate
          previousLabel={<div className="pagination-btn">previous</div>}
          nextLabel={<div className="pagination-btn">next</div>}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </StyledPaginateContainer>
{/*       <ModalButton>
        <Button onClick={() => setOpenModal(true)}>
          SEE ALL
        </Button>
      </ModalButton>
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        {movies.map((movie) => {
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
      </Modal> */}
    </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`;

const ListMovies = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const PaginationDetails = styled.div`
  margin: 0 auto;
  padding: 10px 10px;
  font-weight: 600;
`;

const StyledPaginateContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .pagination li {
    margin-right: 10px;
  }

  .page-item {
    display: inline-block;
    margin: 0 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }

  .active {
    background-color: var(--color-primary-1);
    color: var(--color-primary-5);
    padding: 0 3px;
  }

  .pagination-btn {
    display: inline-block;
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--color-primary-5);
    color: var(--color-primary-1);
  }

  .pagination-btn:hover {
    background-color: #1e50ff;
    color: #fff;
    border-color: #1e50ff;
  }

  .pagination-space {
    margin: 0 5px;
  }
`;


/* const Button = styled(StyledButton)`
  width: 150px;
`; */

/* const ModalButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`; */

/* const CustomCarousel = styled(Carousel)`
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
`; */


