import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FilterProps } from "../pages";

export interface AlbumI {
    rank: string;
    artist: string;
    album: string;
    appleLink: string;
}

interface AlbumComponentProps extends AlbumI {
    filter: string;
    shareLinkActive: boolean;
    shareLinkTrue: boolean;
}

function AlbumComponent(props: AlbumComponentProps) {
    const [likeOrDislike, setLikeOrDislike] = useState<FilterProps | undefined>(undefined);

    useEffect(() => {
        const fromLocalState = localStorage.getItem(props.rank);
        setLikeOrDislike(
            fromLocalState === "like" ||
                fromLocalState === "dislike" ||
                fromLocalState === "unknown"
                ? fromLocalState as FilterProps
                : undefined
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        props.shareLinkActive &&
            setLikeOrDislike(props.shareLinkTrue ? "like" : "unknown");
    }, [props.shareLinkTrue, props.shareLinkActive]);

    useEffect(() => {
        if (props.shareLinkActive === true) {
            return;
        }
        if (likeOrDislike === "like") {
            localStorage.setItem(props.rank, "like");
        } else if (likeOrDislike === "dislike") {
            localStorage.setItem(props.rank, "dislike");
        } else if (likeOrDislike === "unknown") {
            localStorage.setItem(props.rank, "unknown");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likeOrDislike, props.rank]);

    const isSemiHidden = likeOrDislike === "dislike";
    const isShown = likeOrDislike === props.filter ||
        props.filter === "unfiltered" ||
        (props.filter === "unknown" && likeOrDislike === undefined);

    if (!isShown) {
        return null; // Equivalent to display: none
    }

    return (
        <div className={`album-card ${isSemiHidden ? "semi-hidden" : ""}`}>
            <div className="album-top-wrapper">
                <div className="album-rank">{props.rank}</div>
                {props.appleLink.length !== 0 ? (
                    <Link href={props.appleLink} passHref className="album-image-link">
                        <Image
                            alt={`album cover for ${props.album} by ${props.artist}`}
                            src={"https://2010s-top.derekr.net/albums/" + props.rank + ".jpg"}
                            height={200}
                            width={200}
                            className="album-cover"
                        />
                    </Link>
                ) : (
                    <div className="album-image-link">
                        <Image
                            onClick={() => alert("This album is not available on Apple Music")}
                            alt={`album cover for ${props.album} by ${props.artist}`}
                            src={"https://2010s-top.derekr.net/albums/" + props.rank + ".jpg"}
                            height={200}
                            width={200}
                            className="album-cover"
                        />
                    </div>
                )}
            </div>
            
            <div className={`album-vote ${likeOrDislike === 'like' ? 'voted-like' : ''} ${likeOrDislike === 'dislike' ? 'voted-dislike' : ''}`}>
                <span onClick={() => setLikeOrDislike("dislike")}>
                    <span role="img" aria-label="Thumbs-down emoji">👎</span>
                </span>
                <span onClick={() => setLikeOrDislike("like")}>
                    <span role="img" aria-label="Thumbs-up emoji">👍</span>
                </span>
            </div>
            
            <h2 className="album-title">
                <span className="album-artist">{props.artist}</span>
                <br />
                {props.album}
            </h2>
        </div>
    );
}

export default AlbumComponent;
