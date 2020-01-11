import React, { useContext, useState } from "react";
import styled from 'styled-components';
import search from 'youtube-search';

import { music } from '../App'

const SearchResult = ({ musicList, page }) => {
    const dispatch = useContext(music)
    const [generate, setGenerate] = useState(false)

    const onClickArtist = (id) => {
        dispatch({
            type: 'SELECT_ARTISTS',
            payload: id
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setGenerate(true)
        const selectedArtists = musicList.filter((artist) => {
            return artist.selected === true
        })

        // HERE COMES THE CALL TO THE YOUTUBE API
        const opts = {
            maxResults: 10,
            key: 'AIzaSyCw32VxdRu5BMNv1TTbG-RMgA1-c7d8u7E'
        };
        selectedArtists.map((artist) => {
            search(artist.name, opts, function (err, results) {
                if (err) return console.log(err);
                dispatch({
                    type: 'ADD_VIDEO',
                    payload: {
                        id: artist.id,
                        videos: results.filter((video) => video.kind === 'youtube#video')
                    }
                })
                page({ type: 'VIDEO' })
            });
        })
    }

    const Artist = styled.li`
    background: ${props => props.selected ? "green" : "white"};`

    if (musicList) {
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
                <button onClick={() => page({ type: 'SEARCH'})}> Back to search </button>
            </div>
        )
    }
    return 'No artists to show'
}

export default SearchResult