import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import MovieCard from './MovieCard';


const MoviesList = ({ movies, title, showOverviewCondition}) => {

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button onClick={() => onClick()} />;
  };

  return (

    <div>
      <CustomTitle>{title}</CustomTitle>
      <CustomCarousel
        showThumbs={false}
        showArrows={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={8000}
        showIndicators={true}
      >
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.movieId}
                movie={movie}
                showOverview={showOverviewCondition}
              />
            );
          })}

      </CustomCarousel >
      </div>
  );
}

export default MoviesList;

export const CustomTitle = styled.h2`
  margin: 40px 0 20px 0;
  color: var(--color-primary-5);
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 30px;
  padding: 10px 5px;
  display: flex;
  justify-content: center;
`;

const CustomCarousel = styled(Carousel)`
  font-size: 14px;
  display: block;
  margin: 20px 0;
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

const SlidesDetails = styled.div`
display: 'flex';
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};


