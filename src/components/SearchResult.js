import React, { useContext } from "react";
import styled from 'styled-components';

import { music } from '../App'

const SearchResult = ({ musicList }) => {
    const dispatch = useContext(music)

    const onClickArtist = (id) => {
        dispatch({
            type: 'SELECT',
            payload: id
        })
    }

    const onClickSubmit = () => {
        const selectedArtists = musicList.filter((artist) => {
            return artist.selected === true
        })
        console.log(selectedArtists);
    }

    const Artist = styled.p`
    background: ${props => props.selected ? "green" : "white"};`

    if (musicList) {
        return (
            <div>
                {/* RESULT OF THE LAST.FM SEARCH */}
                <h3>RESULT</h3>
                <ul>
                    {musicList
                        // .filter(artist => artist.selected === false)
                        .map((artist) => {
                            return <Artist
                                selected={artist.selected ? 'true' : 'false'}
                                key={artist.id}
                                onClick={() => onClickArtist(artist.id)}
                                selected={artist.selected == true ? true : false} >
                                {artist.name}</Artist>
                        })
                    }
                </ul>
                <button onClick={onClickSubmit}>Create Playlist</button>
            </div>
        )
    }
    return 'No artists to show'
}

export default SearchResult