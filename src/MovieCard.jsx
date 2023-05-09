import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
  max-width: 600px;
  width: 100%;
  object-fit: contain;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid var(--color-primary-3);
  border-radius: 5px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin: 30px auto;
`;

const Image = styled.img`
  position: relative;
  height: 100%;
  object-fit: contain;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--color-primary-1);
`;

const Overview = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  padding: 0 40px;
    color: var(--color-font-primary);
`;

const Rating = styled.p`
  font-size: 14px;
  background-color: var(--color-primary-3);
  padding: 10px 0px;
  color: var(--color-font-primary);
`;

export const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";

const MovieCard = ({ movie, showOverview }) => {
  const { movieTitle, overview, posterPathTMDB, movieRating } = movie;


  return (
    <Card>
      <ImageWrapper>
        <Image
          src={POSTER_PREFIX + posterPathTMDB}
          alt={`Poster for ${movieTitle}`}
        />
      </ImageWrapper>
      <Title>{movieTitle}</Title>
      {showOverview && <Overview>{overview}</Overview>}
      <Rating>Rating: {movieRating}</Rating>
    </Card>
  );
};

export default MovieCard;
