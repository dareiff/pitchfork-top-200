import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FilterProps } from "../pages";

interface AlbumStyleProps {
    semiHide?: boolean;
    show?: boolean;
}

const Album = styled.div<AlbumStyleProps>`
    width: 240px;
    margin: 10px;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    opacity: 1;
    opacity: ${(props) => (props.semiHide ? "0.2" : "1")};

    display: ${(props) => (props.show ? "block" : "none")};
    @media (max-width: 500px) {
        width: 160px;
        margin: 5px;
    }
`;

interface VoteInterface {
    iLike: boolean | undefined;
    iHate: boolean | undefined;
}

const Vote = styled.div<VoteInterface>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: ${(props) => props.iLike && "#4af2a1"};
    background: ${(props) => props.iHate && "#f24141"};
    padding: 4px 0;
    border-radius: 4px;
    margin: 5px 20px;

    > span {
        font-size: 22px;
        cursor: pointer;
    }
`;

const Title = styled.h2`
    font-size: 1.2em;
    line-height: 1.3em;
    margin: 5px;

    @media (max-width: 500px) {
        font-size: 16px;
        text-align: left;
        margin: 10px 0;
    }
`;

const Rank = styled.h3`
    font-size: 20px;
    margin: 10px 10px 0 0;
    color: black;
    display: block;
    text-align: left;

    @media (max-width: 500px) {
        margin: 5px 0;
    }
`;

const TopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export interface AlbumI {
    rank: string;
    artist: string;
    album: string;
    appleLink: string;
}
interface AlbumComponent extends AlbumI {
    filter: string;
    shareLinkActive: boolean;
    shareLinkTrue: boolean;
}

function AlbumComponent(props: AlbumComponent) {
    const [likeOrDislike, setLikeOrDislike] = useState<FilterProps | undefined>(
        undefined
    );

    useEffect(() => {
        const fromLocalState = localStorage.getItem(props.rank);
        setLikeOrDislike(
            fromLocalState === "like" ||
                fromLocalState === "dislike" ||
                fromLocalState === "unknown"
                ? fromLocalState
                : undefined
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // override the local storage with the query param if set
    useEffect(() => {
        props.shareLinkActive &&
            setLikeOrDislike(props.shareLinkTrue ? "like" : "unknown");
    }, [props.shareLinkTrue, props.shareLinkActive]);

    useEffect(() => {
        if (props.shareLinkActive === true) {
            //bail out and do not set localStorage for anything
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

    return (
        <Album
            semiHide={likeOrDislike === "dislike"}
            show={
                likeOrDislike === props.filter ||
                props.filter === "unfiltered" ||
                (props.filter === "unknown" && likeOrDislike === undefined)
            }
        >
            <TopWrapper>
                <Rank>{props.rank}</Rank>
                {props.appleLink.length !== 0 ? (
                    <Link href={props.appleLink} passHref>
                        <Image
                            alt={`album cover for ${props.album} by ${props.artist}`}
                            src={
                                "https://2010s-top.derekr.net" +
                                "/albums/" +
                                props.rank +
                                ".jpg"
                            }
                            height={200}
                            width={200}
                        />
                    </Link>
                ) : (
                    <Image
                        onClick={() =>
                            alert("This album is not available on Apple Music")
                        }
                        alt={`album cover for ${props.album} by ${props.artist}`}
                        src={
                            "https://2010s-top.derekr.net" +
                            "/albums/" +
                            props.rank +
                            ".jpg"
                        }
                        height={200}
                        width={200}
                    />
                )}{" "}
            </TopWrapper>
            <Vote
                iLike={likeOrDislike === "like"}
                iHate={likeOrDislike === "dislike"}
            >
                <span onClick={() => setLikeOrDislike("dislike")}>
                    <span role="img" aria-label="Thumbs-down emoji">
                        👎
                    </span>
                </span>
                <span onClick={() => setLikeOrDislike("like")}>
                    <span role="img" aria-label="Thumbs-up emoji">
                        👍
                    </span>
                </span>
            </Vote>
            <Title>
                {props.artist}:<br />
                {props.album}
            </Title>
        </Album>
    );
}

export default AlbumComponent;
