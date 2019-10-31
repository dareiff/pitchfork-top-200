import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import customData from './album.json';
import LazyLoad from 'react-lazyload';

const AlbumContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 40px auto;
  justify-content: space-between;
`;

const Album = styled.div`
  width: 240px;
  margin: 10px;
  align-self: flex-start;

  @media (max-width: 500px) {
    width: 160px;
    margin: 5px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  line-height: 1.3em;

  @media (max-width: 500px) {
    font-size: 16px;
    text-align: left;
    margin: 10px 0;
  }
`;

const MainTitle = styled.h1`
  text-align: center;
  font-size: 30px;
  line-height: 1.3em;
`;

const Description = styled.p`
    text-align: center;
    margin: auto;
    width: 70%;
    max-width: 600px;
`;

const Rank = styled.h3`
  background-color: blue;
  font-size: 20px;
  margin: 10px;
  border: 4px solid blue;
  padding: 10px;
  color: white;
  display: block;
  position: absolute;
  line-height: 1em;
  text-align: center;

  @media (max-width: 500px) {
    margin: 5px 0;
  }
`;

const CoverArt = styled.img`
  width: 200px;

  @media (max-width: 500px) {
    width: 140px;
    margin: 0;
  }
`;

const AppleMusicLink = styled.a`
  margin: auto;
  text-decoration: none;

  &:hover {
    border-bottom: none;
  }

  @media (max-width: 500px) {
    margin: 0;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function App() {

let albumsToJSX = customData.map(album => (
    <Album key={album.rank}>
      <TopWrapper>
        <Rank>{album.rank}</Rank>
        <AppleMusicLink href={album.applemusic}>
          <LazyLoad height={200}>
            <CoverArt src={process.env.PUBLIC_URL + "/albums/" + album.rank + ".jpg"} />
          </LazyLoad>
        </AppleMusicLink>
      </TopWrapper>
      <Title>{album.artist}: {album.album}</Title>
    </Album>
  ));

  return (
    <main>
    <MainTitle>Pitchfork’s Top 200 from the 2010s</MainTitle>
    <Description>For Music folks.</Description>
    <AlbumContainer>
      {albumsToJSX}
    </AlbumContainer>
    </main>
  );
}

export default App;
