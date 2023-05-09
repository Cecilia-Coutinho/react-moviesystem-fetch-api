import styled from 'styled-components';
import {
  Title
} from './PeopleList';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import MovieCard from './MovieCard';
import { useState, useEffect } from "react";

export const CustomTitle = styled(Title)`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const CustomCarousel = styled(Carousel)`
  font-size: 14px;
  display: block;
  margin: 20px 0;
  padding: 10px;

  .carousel .control-dots {
    width: 100%;
    position: absolute;
    bottom: 0px 0;
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
`;

const PaginationDetails = styled.div`
  margin: 0 auto;
  padding: 10px 10px;
  font-weight: 600;
`;

const styles = {
  root: {
    // your custom styles for the PersonList component
    // ...
  },
};


const MoviesList = ({ movies, title, showOverviewCondition}) => {
  const [pagination, setPagination] = useState(0);
  useEffect(() => {
    setPagination(1);
  }, [pagination]);


  return (

      <div>
        <CustomTitle>{title}</CustomTitle>
        <CustomCarousel
          showThumbs={false}
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={8000}
          showIndicators={true}
        >
          {movies.map((movie, index) => {
            return (
              <div key={movie.movieId}>
                <MovieCard movie={movie} showOverview={showOverviewCondition}/>
                <PaginationDetails>
                  <p>Showing {pagination + index} of {movies.length} items</p>
                </PaginationDetails>
              </div>
            );
          })}
        </CustomCarousel >
      </div>
  );
}

export default MoviesList;
