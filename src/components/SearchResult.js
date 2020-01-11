import React, { useContext } from "react";
import styled from 'styled-components';

import { music } from '../App'

const SearchResult = ({ musicList }) => {
    const dispatchArtists = useContext(music)

    const onClickArtist = (id) => {
        dispatchArtists({
            type: 'SELECT_ARTISTS',
            payload: id
        })
    }

    const Artist = styled.li`
    background: ${props => props.selected ? "green" : "white"};`

    if (musicList) {
        return (
            <div className="container">
                <h3>RESULT</h3>
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
            </div>
        )
    }
    return 'No artists to show'
}

export default SearchResult