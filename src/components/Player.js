import React, { useContext } from 'react'
import styled from 'styled-components';

import { music } from '../App'

const Player = (artist) => {
    const dispatch = useContext(video)

    const Artist = styled.li`
    background: ${props => props.show ? "green" : "white"};`

    // const selectOtherVideo = (id) => {
    //     dispatch({
    //         type: 'CHANGE_VIDEO',
    //         payload: id
    //     })
    // }
    return (
        <Artist
            key={artist.id}
            show={artist.showVideo === true ? true : false}
        >
            <h4>{artist.name}</h4>
            <iframe width="560" height="315" src="http://www.youtube.com/embed/0vrdgDdPApQ?playlist=cbut2K6zvJY,7iw30sK2UCo,sYV5MTy0v1I" frameborder="0" allowfullscreen></iframe>
            {/* <iframe src={`https://www.youtube.com/embed/12`} /> */}
            {/* <iframe src="http://www.youtube.com/embed/0vrdgDdPApQ?playlist=cbut2K6zvJY,7iw30sK2UCo,sYV5MTy0v1I" /> */}
            <br />
            <button onClick={() => selectOtherVideo(artist.id)}> try another video </button>
        </Artist>
    )
}

export default Player