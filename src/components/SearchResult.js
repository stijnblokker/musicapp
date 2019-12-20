import React, { useContext } from "react";

import { music } from '../App'

const SearchResult = ({ musicList }) => {
    const dispatch = useContext(music)

    const onClickArtist = (artist) => {
        dispatch({
            type: 'SELECT',
            payload: artist
        })
    }

    const onClickSubmit = () => {
        const selectedArtists = musicList.filter((artist) => {
            return artist.selected === true
        })
        console.log(selectedArtists);
        
    }

    if (musicList) {
        return (
            <div>
                <ul>
                    {musicList.map((artist) => {
                        return <li key={artist.mbid} onClick={() => onClickArtist(artist)}>{artist.name}</li>
                    })}
                </ul>
                <button onClick={onClickSubmit}>Create Playlist</button>
            </div>
        )
    }
    return 'No artists to show'
}

export default SearchResult