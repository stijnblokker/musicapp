import React, { useContext } from "react";
import styled from 'styled-components';
import search from 'youtube-search';

import { music, video } from '../App'

const SearchResult = ({ musicList, page }) => {
    const dispatchMusic = useContext(music)
    const dispatchVideo = useContext(video)

    const onClickArtist = (id) => {
        dispatchMusic({
            type: 'SELECT_ARTISTS',
            payload: id
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedArtists = musicList.filter((artist) => {
            return artist.selected === true
        })

        const opts = {
            maxResults: 10,
            key: process.env.REACT_APP_YOUTUBE_KEY
        };

        selectedArtists.map((artist) => {
            return search(`${artist.name} music`, opts, function (err, results) {
                if (err) return console.log(err);
                dispatchVideo({
                    type: 'ADD_VIDEO',
                    payload: {
                        id: artist.id,
                        artist: artist.name,
                        videos: results
                            .filter((video) => video.kind === 'youtube#video')
                            .map((video) => {
                                return {
                                    id: video.id,
                                    title: video.title,
                                    thumbnails: video.thumbnails
                                }
                            })
                    }
                })
                page({ type: 'VIDEO' })
            });
        })
    }

    const Artist = styled.li`
    background: ${props => props.selected ? "green" : "white"};
    color: ${props => props.selected ? "white" : "black"};`

    if (musicList.length !== 0) {
        return (
            <div className="main">
                <h3>Step 2: Select artists that you would like to hear</h3>
                <hr />
                <ul className="artistslist">
                    {musicList
                        .map((artist) => {
                            return <Artist className="artistlist"
                                key={artist.id}
                                onClick={() => onClickArtist(artist.id)}
                                selected={artist.selected === true ? true : false}
                            >
                                {artist.name}
                            </Artist>
                        })
                    }
                </ul>
                <div>
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Discover!</button>||
                    <button onClick={() => page({ type: 'SEARCH' })}>Search again... </button>
                    </form>
                </div>
            </div>
        )
    }
    return (<div className="main">
        <p>Your search didn't give us any result :( Perhaps you made a typo? </p>
        <button onClick={() => page({ type: 'SEARCH' })}>Search again... </button>
    </div>)
}

export default SearchResult