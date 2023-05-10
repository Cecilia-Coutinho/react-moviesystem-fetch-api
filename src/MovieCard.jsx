import React from 'react';
import styled from 'styled-components';

const MovieCard = ({ movie, showOverview }) => {
  const { movieTitle, overview, posterPathTMDB, movieRating } = movie;


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
          <p>Rating: {movieRating}</p>
                </div>
            </div>

    </ImageWrapper>
/*     <div>
      <ImageWrapper>
        <Image
          src={POSTER_PREFIX + posterPathTMDB}
          alt={`Poster for ${movieTitle}`}
        />
      </ImageWrapper>
      <h3>{movieTitle}</h3>
      {showOverview && <Overview>{overview}</Overview>}
      <p>Rating: {movieRating}</p>
    </div> */
  );
};

export default MovieCard;



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
      max-width: 220px;
  width: 100%;
  object-fit: contain;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid var(--color-primary-3);
  border-radius: 5px;
  }

  .banner-image {
    height: 300px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255, 0.255)
    overflow:hidden;
  position: relative;
  height: 100%;
  object-fit: contain;
  }

  h1 {
    color: rgba(255,255,255,0.98);
    text-transform: uppercase;
    font-size: 22px;
  }

  p {
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 2px;
  }
`;

const Image = styled.img`
  height: 300px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0px;
  color: var(--color-primary-3);
`;

const Overview = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  padding: 0 5px;
`;

const Rating = styled.p`
  font-size: 14px;
  background-color: var(--color-primary-3);
  padding: 10px 0px;
  color: var(--color-font-primary);
`;

export const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";
