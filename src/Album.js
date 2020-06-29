import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

const Album = styled.div`
	width: 240px;
	margin: 10px;
	align-self: flex-start;
	display: block;
	display: ${(props) => props.showMe === false && "none"};
	opacity: 1;
	opacity: ${(props) => props.semiHide};

	@media (max-width: 500px) {
		width: 160px;
		margin: 5px;
	}
`;

const Vote = styled.div`
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

const CoverArt = styled.img`
	width: 200px;

	@media (max-width: 500px) {
		width: 140px;
		margin: 0;
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

function AlbumComponent(props) {
	let currentSavedState = localStorage.getItem(props.rank);
	let convertedLocalState;

	switch (currentSavedState) {
		case "undefined":
			convertedLocalState = undefined;
			break;
		case "true":
			convertedLocalState = true;
			break;
		case "false":
			convertedLocalState = false;
			break;
		default:
			convertedLocalState = undefined;
	}

	const [likeOrDislike, setLikeOrDislike] = useState(convertedLocalState);
	const [showMe, setShowMe] = useState(undefined);

	useEffect(() => {
		localStorage.setItem(props.rank, likeOrDislike);
	}, [likeOrDislike, props.rank]);

	useEffect(() => {
		if ((props.filter === "like") & (likeOrDislike === true)) {
			setShowMe(true);
		} else if ((props.filter === "like") & (likeOrDislike === undefined)) {
			setShowMe(false);
		} else if ((props.filter === "like") & (likeOrDislike === false)) {
			setShowMe(false);
		} else if ((props.filter === "dislike") & (likeOrDislike === true)) {
			setShowMe(false);
		} else if ((props.filter === "dislike") & (likeOrDislike === false)) {
			setShowMe(true);
		} else if (
			(props.filter === "dislike") &
			(likeOrDislike === undefined)
		) {
			setShowMe(false);
		} else if (
			(props.filter === "undefined") &
			(likeOrDislike === undefined)
		) {
			setShowMe(true);
		} else if ((props.filter === "undefined") & (likeOrDislike === false)) {
			setShowMe(false);
		} else if ((props.filter === "undefined") & (likeOrDislike === true)) {
			setShowMe(false);
		} else if (props.filter === "noFilter") {
			setShowMe(true);
		}
	}, [props.filter, likeOrDislike]);

	return (
		<Album showMe={showMe} semiHide={likeOrDislike === false && "0.2"}>
			<TopWrapper>
				<Rank>{props.rank}</Rank>
				<AlbumLink href={props.appleLink}>
					<LazyLoad height={200}>
						<CoverArt
							src={
								process.env.PUBLIC_URL +
								"/albums/" +
								props.rank +
								".jpg"
							}
						/>
					</LazyLoad>
				</AlbumLink>
			</TopWrapper>
			<Vote iLike={likeOrDislike}>
				<span onClick={() => setLikeOrDislike(false)}>
					<span role="img" aria-label="Thumbs-down emoji">
						👎
					</span>
				</span>
				<span onClick={() => setLikeOrDislike(undefined)}>
					<span role="img" aria-label="Neutral-face emoji">
						😑
					</span>
				</span>
				<span onClick={() => setLikeOrDislike(true)}>
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
