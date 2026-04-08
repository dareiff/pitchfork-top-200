import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AlbumComponent, { AlbumI } from "../src/Album";
import Albums from "../src/album.json";
import Link from "next/link";

export type FilterProps = "like" | "dislike" | "unfiltered" | "unknown";

export default function App() {
    const [filter, setFilter] = useState<FilterProps>("unfiltered");
    const [likedFromQuery, setLikedFromQuery] = useState<Array<string>>([]);
    const [cleared, setCleared] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (router.query.liked && typeof router.query.liked === "string") {
            setLikedFromQuery(router.query.liked.split(","));
            setFilter("like");
        } else if (cleared) {
            setFilter("unfiltered");
            setLikedFromQuery([]);
        }
    }, [router.query.liked, cleared]);

    const getShareURL = () => {
        const copyOfLocalStorage = { ...localStorage };
        if (copyOfLocalStorage) {
            const copyOfLocalStorageArray: Array<string> = Object.keys(
                copyOfLocalStorage
            ).filter((key) => copyOfLocalStorage[key] === "like");
            const shareURL = `${
                process.env.NEXT_PUBLIC_SHARE_URL || "https://2010s-top.derekr.net"
            }?liked=${copyOfLocalStorageArray.join(",")}`;
            
            navigator.clipboard.writeText(shareURL)
                .then(() => alert("Share link copied to clipboard!"))
                .catch((err) => console.error(err));
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
        <div className="layout">
            <Head>
                <title>Pitchfork’s Top 200 from the 2010s - for Apple Music</title>
                <meta
                    name="description"
                    content="Pitchfork’s Top 200 from the 2010s - for Apple Music"
                />
            </Head>

            <header className="page-header">
                <h1 className="main-title">
                    <Link
                        href={
                            process.env.NEXT_PUBLIC_SHARE_URL
                                ? process.env.NEXT_PUBLIC_SHARE_URL
                                : "https://2010s-top.derekr.net"
                        }
                    >
                        Pitchfork’s Top 200 of the 2010s
                    </Link>
                </h1>
                <p className="description subtle-text">For Apple Music folks.</p>
                
                {!router.query.liked && (
                    <p className="description interactive-text">
                        <span onClick={() => getShareURL()} className="share-link">
                            Copy URL to share your favorites
                        </span>
                    </p>
                )}
            </header>

            <main className="content">
                {!router.query.liked ? (
                    <div className="filter-section">
                        <span className="filter-header">Filter by:</span>
                        <div className="filter-controls">
                            <button 
                                className={`filter-toggle ${filter === 'like' ? 'active' : ''}`} 
                                onClick={() => setFilter("like")}
                                aria-label="Show loved"
                                title="Show loved"
                            >
                                ❤️
                            </button>
                            <button 
                                className={`filter-toggle ${filter === 'dislike' ? 'active' : ''}`} 
                                onClick={() => setFilter("dislike")}
                                aria-label="Show disliked"
                                title="Show disliked"
                            >
                                💔
                            </button>
                            <button 
                                className={`filter-toggle ${filter === 'unknown' ? 'active' : ''}`} 
                                onClick={() => setFilter("unknown")}
                                aria-label="Show unrated"
                                title="Show unrated"
                            >
                                🤷‍♀️
                            </button>
                            <button 
                                className={`filter-toggle ${filter === 'unfiltered' ? 'active' : ''}`} 
                                onClick={() => setFilter("unfiltered")}
                                aria-label="Show all"
                                title="Show all"
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="shared-view-banner">
                        <h2>Your friend shared their favorite albums with you!</h2>
                        <p>
                            If you’d like to see every top album of the 2010s,{" "}
                            <span
                                className="interactive-text share-link"
                                onClick={() => resetRecommendations()}
                            >
                                cheer up!
                            </span>
                        </p>
                    </div>
                )}

                <div className="album-grid">
                    {Albums.map((album: AlbumI) => (
                        <AlbumComponent
                            filter={filter}
                            key={album.rank}
                            rank={album.rank}
                            album={album.album}
                            artist={album.artist}
                            appleLink={album.appleLink}
                            shareLinkActive={likedFromQuery.length > 0}
                            shareLinkTrue={likedFromQuery.includes(album.rank)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
