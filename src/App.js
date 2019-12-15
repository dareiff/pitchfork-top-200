import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import customData from "./album.json";
import Album from "./Album.js";

const MainTitle = styled.h1`
  text-align: center;
  font-size: 30px;
  line-height: 1.3em;
`;

const FilterHeader = styled.span`
  display: block;
  text-align: center;
  font-size: 18px;
  line-height: 1.3em;
  font-weight: 700;
  margin: 30px auto 0;
`;

const Description = styled.p`
  text-align: center;
  margin: auto;
  width: 70%;
  max-width: 600px;
`;

const Toggle = styled.a`
  text-align: center;
  margin: auto;
  width: 70%;
  max-width: 600px;
`;

const AlbumContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 40px auto;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  flex-flow: row;
  width: 200px;
  align-items: center;
  margin: 0 auto;
  justify-content: space-around;
`;

function App() {

  const [filter, setFilter] = useState('noFilter');

  let albumsToJSX = customData.map(album => (
    <Album filter={filter} key={album.rank} rank={album.rank} album={album.album} artist={album.artist} appleLink={album.applemusic} />
  ));

  return (
    <main>
      <MainTitle>Pitchfork’s Top 200 from the 2010s</MainTitle>
      <Description>For Music folks.</Description>
      <FilterHeader>Filter:</FilterHeader>
      <Filter>
        <Toggle onClick={() => setFilter("like")}>❤️</Toggle>
        <Toggle onClick={() => setFilter("dislike")}>💔</Toggle>
        <Toggle onClick={() => setFilter("undefined")}>🤷‍♀️</Toggle>
        <Toggle onClick={() => setFilter("noFilter")}>❌</Toggle>
      </Filter>
      <AlbumContainer>
        {albumsToJSX}
      </AlbumContainer>
    </main>
  );
}

export default App;
