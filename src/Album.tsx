import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface AlbumStyleProps {
  semiHide?: boolean;
  hideCompletely?: boolean;
}

const Album = styled.div<AlbumStyleProps>`
  width: 240px;
  margin: 10px;
  align-self: flex-start;
  display: block;
  opacity: 1;
  opacity: ${(props) => (!props.semiHide ? "0.2" : "1")};

  display: ${(props) => (props.hideCompletely ? "none" : "block")};
  @media (max-width: 500px) {
    width: 160px;
    margin: 5px;
  }
`;

interface VoteInterface {
  iLike: boolean | undefined;
}

const Vote = styled.div<VoteInterface>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${(props) => props.iLike && "#4af2a1"};
  padding: 4px 0;
  border-radius: 4px;
  margin: 5px 20px;

  > span {
    font-size: 22px;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  line-height: 1.3em;
  margin: 5px;

  @media (max-width: 500px) {
    font-size: 16px;
    text-align: left;
    margin: 10px 0;
  }
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

const AlbumLink = styled.a`
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

interface AlbumComponent {
  rank: string;
  artist: string;
  album: string;
  appleLink: string;
  filter: string;
}

function AlbumComponent(props: AlbumComponent) {
  const [iLike, setILike] = useState<true | false | undefined>(false);
  React.useEffect(() => {
    let convertedLocalState;
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const currentSavedState = localStorage.getItem("key");
      switch (currentSavedState) {
        case "undefined":
          setILike(undefined);
          break;
        case "true":
          setILike(true);
          break;
        case "false":
          setILike(false);
          break;
        default:
          setILike(undefined);
      }
    }
  }, []);

  const [likeOrDislike, setLikeOrDislike] = useState<
    "like" | "dislike" | "unknown"
  >(iLike ? "like" : "dislike");

  useEffect(() => {
    localStorage.setItem(props.rank, likeOrDislike ? "true" : "false");
  }, [likeOrDislike, props.rank]);

  return (
    <Album
      semiHide={likeOrDislike === "dislike" || likeOrDislike !== props.filter}
      hideCompletely={
        likeOrDislike !== props.filter &&
        props.filter !== "unknown" &&
        props.filter !== "all"
      }
    >
      <TopWrapper>
        <Rank>{props.rank}</Rank>
        <AlbumLink href={props.appleLink}>
          <Image
            src={
              "https://2010s-top.derekr.net" + "/albums/" + props.rank + ".jpg"
            }
            height={200}
            width={200}
          />
        </AlbumLink>
      </TopWrapper>
      <Vote iLike={likeOrDislike === "like"}>
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
        {props.artist}: {props.album}
      </Title>
    </Album>
  );
}

export default AlbumComponent;