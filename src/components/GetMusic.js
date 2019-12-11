import React, { useState } from 'react'
import request from 'superagent'

function GetMusic() {
    const [artist, setArtist] = useState("")
    const [similarArtists, setSimilarArtists] = useState([])
    const handleChange = (event) => {
        setArtist(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(artist);
        request(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=0b9d436b2e0c7b005f0438308d913504&format=json`)
            .then(response => {
                const similar = response.body.similarartists.artist
                setSimilarArtists(similar)
                console.log(similar);
                console.log(similarArtists);
            })
            .catch(console.error)
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <br />
            <input name="artist" value={artist} onChange={handleChange} placeholder="type your artist here" />
            <button type="submit"> Show results! </button>
        </form>
        <ul>
            { similarArtists && similarArtists.map((artist) => {
            return <div key={artist.index}>{artist.name}</div>
            }) }
        </ul>
        </div>
    )
}

export default GetMusic