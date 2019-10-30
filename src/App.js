import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import customData from './album.json';

const AlbumContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;

`;

const Album = styled.div`
  width: 240px;
  margin: 10px;
  align-self: flex-start;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
`;

const Rank = styled.h3`
  font-size: 30px;
  margin: 10px;
  border: 4px solid blue;
  border-radius: 50px;
  width: 20px;
  color: blue;
  height: 20px;
  line-height: 1em;
  padding: 30px;
  text-align: center;
`;

const CoverArt = styled.div`
`;

const AppleMusicLink = styled.a`
  font-size: 70px;
  text-align: center;
  line-height: 1em;
  margin: auto;
`;
const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;







function App() {

let albumsToJSX = customData.map(album => (
    <Album>

      <TopWrapper><Rank>{album.rank}</Rank>
            <AppleMusicLink href={album.applemusic}><CoverArt>📻</CoverArt></AppleMusicLink></TopWrapper>
      <Title>{album.artist}: {album.album}</Title>
    </Album>
  ));

  return (
    <main>
    <AlbumContainer>
      {albumsToJSX}
    </AlbumContainer>
    </main>
  );
}

export default App;
