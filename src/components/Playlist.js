import React, { useContext } from 'react'
import { video } from '../App'

const Playlist = () => {
    const playlist = useContext(video)
    return (
        <p>playlist: {playlist}</p>
    )
}

export default Playlist