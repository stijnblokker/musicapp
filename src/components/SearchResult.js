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
            key: 'AIzaSyCw32VxdRu5BMNv1TTbG-RMgA1-c7d8u7E' // MAKE ENV VARIABLE !!!!!!!!
        };

        selectedArtists.map((artist) => {
            return search(`${artist.name} music`, opts, function (err, results) {
                if (err) return console.log(err);
                console.log(results);
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
    background: ${props => props.selected ? "green" : "white"};`

    return (
        <div className="container">
            <h3>Similar Artist</h3>
            <p> select artist that you want to hear: </p>
            <ul>
                {musicList
                    .map((artist) => {
                        return <Artist
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
                    <p> click to generate playlist</p>
                    <button type="submit"> Show videos</button>
                </form>
            </div>
            <button onClick={() => page({ type: 'SEARCH' })}> Re-search </button>
        </div>
    )
}

export default SearchResult