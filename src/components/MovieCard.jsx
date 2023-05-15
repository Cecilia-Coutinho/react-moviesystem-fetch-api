import React from 'react';
import styled from 'styled-components';
import {
  useParams
} from "react-router-dom";
import { useState } from 'react';
import AddNewMovie from './AddNewMovie';
import AddMovieRating from './AddMovieRating';

const MovieCard = ({ movie, showOverview, showAddMovie, showAddRating }) => {
  const { movieTitle, overview, posterPathTMDB, movieRating } = movie;

  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();

  return (
    <ImageWrapper>
      <div className="container">
        <div className="wrapper">
          <div className="banner-image">
            <Image
              src={POSTER_PREFIX + posterPathTMDB}
              alt={`Poster for ${movieTitle}`}
            />
          </div>
          <Title>{movieTitle}</Title>
          {showOverview && <Overview>{overview}</Overview>}
          {showAddRating && <AddMovieRating movie={movie} id={id} setIsPending={setIsPending}></AddMovieRating>}
        </div>
        {showAddMovie && <div>
          <AddNewMovie movie={movie} setIsPending={setIsPending} id={id} />
        </div>}
      </div>
    </ImageWrapper>
  );
};

export default MovieCard;

const ImageWrapper = styled.section`
  padding: 0;
  font-family: "Lexend Deca Light";

  .container {
    box-sizing: border-box;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.125);
    filter: drop-shadow(0 30px 10px rgba(0,0,0,0.125));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    text-align: center;
    max-width: 230px;
    width: 100%;
    height:500px;
    object-fit: cover;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid var(--color-primary-3);
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }

  .banner-image {
    border-radius: 12px;
    border: 1px solid rgba(255,255,255, 0.255)
    position: relative;
    width: 200px;
    height:300px;
  }

  p {
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 2px;
  }
  button {
      background-color: var(--color-secondary-5);
      margin-top: 10px;
      border-radius: 2px;
      border: none;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Image = styled.img`
  height: 300px;
`;

const Title = styled.h3`
  margin: 20px 0px;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-primary-3);
  text-transform: uppercase;
`;

const Overview = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  padding: 0 5px;
`;

export const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";
