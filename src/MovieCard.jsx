import React from 'react';
import styled from 'styled-components';
import {
  useParams
} from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Rating } from 'react-simple-star-rating';

const MovieCard = ({ movie, showOverview, showAddMovie, showAddRating }) => {
  const { movieTitle, overview, posterPathTMDB, movieRating } = movie;
  const [movieId, setMovieId] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();

  const handleAddMovieSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);

    //https://localhost:7294/api/PersonMovie/person/1/movie/93

    fetch(`https://localhost:7294/api/PersonMovie/person/${id}/movie/${movie.movieId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie.movieId)
    }).then(() => {
      setIsPending(false);

      //FIXME: check other solution to avoid window.location.reload as a hack
      window.location.reload();
    })
  }

  const handleRatingSubmit = (personRating) => {
    setIsPending(true);

    fetch(`https://localhost:7294/api/PersonMovie/movierating?personId=${id}&movieId=${movie.movieId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personRating)
    }).then(() => {
      setIsPending(false);
      //FIXME: check other solution to avoid window.location.reload as a hack
      window.location.reload();
    })
  }

  const handleAddMovie = () => {
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
  };

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
          <Rating
            iconsCount={5}
            initialValue={movieRating}
            allowFraction size={15}
            onClick={(personRating) =>
            handleRatingSubmit(personRating)} />
        </div>
        {showAddMovie && <div>{handleAddMovie([])}</div>}
      </div>
    </ImageWrapper>
  );
};

export default MovieCard;

const PlusButton = styled(FaPlus)`
  margin: 1px;
  font-size: 16px;
  color: var(--color-primary-1);
  background-color: var(--color-secondary-5);
`;

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
