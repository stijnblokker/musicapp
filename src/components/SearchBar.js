import React, { useState, useContext } from 'react'
import request from 'superagent'

import { music } from '../App'

const SearchBar = ({ page }) => {
    const dispatch = useContext(music)
    const [artist, setArtist] = useState("")

    const handleChange = (event) => {
        setArtist(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        request(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${process.env.REACT_APP_LASTFM_KEY}&format=json`)
            .then(response => {
                const similarArtists = response.body.similarartists.artist
                dispatch(
                    {
                        type: 'ADD_ARTISTS',
                        payload: similarArtists
                    }
                )
                page({ type: 'SIMILAR' })
            })
            .catch(console.error)
    }

    return (

            <div className="main">
                <h3>Step 1. Fill in an artist that you want to explore</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                    {/* <p>Fill in an artist in the form below to find similar artists: </p> */}
                    <input name="artist" value={artist} onChange={handleChange} placeholder="type here" /> <br />
                    <button type="submit"> Show results! </button>
                </form>
            </div>
    )
}

export default SearchBar