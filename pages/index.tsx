import Head from "next/head";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Album from "../src/Album";
import customData from "../src/album.json";

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
    width: 100%;
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
    const [filter, setFilter] = useState<
        "like" | "dislike" | "unfiltered" | "unknown"
    >("unfiltered");

    let albumsToJSX = customData.map((album, x) => (
        <Album
            filter={filter}
            key={x}
            rank={album.rank}
            album={album.album}
            artist={album.artist}
            appleLink={album.applemusic}
        />
    ));

    return (
        <main>
            <Head>
                <title>
                    Pitchfork’s Top 200 from the 2010s - for Apple Music
                </title>
                <meta
                    name="description"
                    content="Pitchfork’s Top 200 from the 2010s - for Apple Music"
                />
            </Head>

            <MainTitle>Pitchfork’s Top 200 from the 2010s</MainTitle>
            <Description>For Music folks.</Description>
            <FilterHeader>Filter:</FilterHeader>
            <Filter>
                <Toggle onClick={() => setFilter("like")}>
                    <span role="img" aria-label="Heart emoji">
                        ❤️
                    </span>
                </Toggle>
                <Toggle onClick={() => setFilter("dislike")}>
                    <span role="img" aria-label="Broken-heart emoji">
                        💔
                    </span>
                </Toggle>
                <Toggle onClick={() => setFilter("unknown")}>
                    <span role="img" aria-label="Shrug emoji (unrated albums)">
                        🤷‍♀️
                    </span>
                </Toggle>
                <Toggle onClick={() => setFilter("unfiltered")}>
                    <span role="img" aria-label="X emoji">
                        ❌
                    </span>
                </Toggle>
            </Filter>
            <AlbumContainer>{albumsToJSX}</AlbumContainer>
        </main>
    );
}

export default App;
