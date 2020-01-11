import React, { useState, useContext } from 'react'
import request from 'superagent'

import { music } from '../App'

const SearchBar = ( {page} ) => {
    const dispatch = useContext(music)

    const [artist, setArtist] = useState("nirvana")

    const handleChange = (event) => {
        setArtist(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(artist);
        request(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=0b9d436b2e0c7b005f0438308d913504&format=json`)
            .then(response => {
                const similarArtists = response.body.similarartists.artist
                dispatch(
                    {
                        type: 'ADD_ARTISTS',
                        payload: similarArtists
                    }
                )
                page({type: 'SIMILAR'})
            })
            .catch(console.error)
    }

    return (
        <div>
            <h1>Find similar artists</h1>
            <form onSubmit={handleSubmit}>
                <p>Fill in an artist in the form below to find similar artists: </p> 
                <input name="artist" value={artist} onChange={handleChange} placeholder="type your artist here" />
                <button type="submit"> Show results! </button>
            </form>
        </div>
    )
}

export default SearchBar