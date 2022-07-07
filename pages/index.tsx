import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Album, { AlbumI } from "../src/Album";
import Albums from "../src/album.json";
import Link from "next/link";

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

export type FilterProps = "like" | "dislike" | "unfiltered" | "unknown";

function App() {
    const [filter, setFilter] = useState<FilterProps>("unfiltered");
    const [likedFromQuery, setLikedFromQuery] = useState<Array<string>>([]);
    const [cleared, setCleared] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (router.query.liked && typeof router.query.liked === "string") {
            setLikedFromQuery(router.query.liked?.split(","));
            setFilter("like");
        } else if (cleared) {
            setFilter("unfiltered");
            setLikedFromQuery([]);
        }
    }, [router.query.liked, cleared]);

    const getShareURL = () => {
        console.log("hello");
        const copyOfLocalStorage = { ...localStorage };
        if (copyOfLocalStorage) {
            const copyOfLocalStorageArray: Array<string> = Object.keys(
                copyOfLocalStorage
            ).filter((key) => copyOfLocalStorage[key] === "like");
            const shareURL = `${
                process.env.NEXT_PUBLIC_SHARE_URL
            }?liked=${copyOfLocalStorageArray.join(",")}`;
            console.log(shareURL);
            // now set as clipboard
            navigator.clipboard.writeText(shareURL);
            return shareURL;
        } else {
            return "";
        }
    };

    const resetRecommendations = () => {
        router.push("/");
        setCleared(true);
    };

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

            <MainTitle>
                <Link
                    href={
                        process.env.NEXT_PUBLIC_SHARE_URL
                            ? process.env.NEXT_PUBLIC_SHARE_URL
                            : "https://2010s-top.derekr.net"
                    }
                >
                    Pitchfork’s Top 200 from the 2010s
                </Link>
            </MainTitle>
            <Description>For Music folks. </Description>
            {!router.query.liked && (
                <Description>
                    <span
                        onClick={() => getShareURL()}
                        style={{ textDecoration: "underline" }}
                    >
                        Copy URL of things you like to share with others
                    </span>
                </Description>
            )}
            {!router.query.liked ? (
                <div>
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
                            <span
                                role="img"
                                aria-label="Shrug emoji (unrated albums)"
                            >
                                🤷‍♀️
                            </span>
                        </Toggle>
                        <Toggle onClick={() => setFilter("unfiltered")}>
                            <span role="img" aria-label="X emoji">
                                ❌
                            </span>
                        </Toggle>
                    </Filter>
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <h2>
                        Your friend shared some of their favorite albums with
                        you!
                    </h2>
                    <p>
                        If you’d like to see every top album of 2010s,{" "}
                        <span
                            style={{ textDecoration: "underline" }}
                            onClick={() => {
                                resetRecommendations();
                            }}
                        >
                            cheer up!
                        </span>
                    </p>
                </div>
            )}
            <AlbumContainer>
                {Albums.map((album: AlbumI) => {
                    return (
                        <Album
                            filter={filter}
                            key={album.rank}
                            rank={album.rank}
                            album={album.album}
                            artist={album.artist}
                            appleLink={album.appleLink}
                            shareLinkActive={
                                likedFromQuery.length > 0 ? true : false
                            }
                            shareLinkTrue={likedFromQuery.includes(album.rank)}
                        />
                    );
                })}
            </AlbumContainer>
        </main>
    );
}

export default App;
