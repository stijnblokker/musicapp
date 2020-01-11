import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import search from 'youtube-search';

import { music } from '../App'

const Playlist = ({ musicList, page }) => {
    const dispatchVideo = useContext(music)
    // const [generate, setGenerate] = useState(false)

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setGenerate(true)
    //     const selectedArtists = musicList.filter((artist) => {
    //         return artist.selected === true
    //     })

    //     // HERE COMES THE CALL TO THE YOUTUBE API
    //     const opts = {
    //         maxResults: 10,
    //         key: 'AIzaSyCw32VxdRu5BMNv1TTbG-RMgA1-c7d8u7E'
    //     };
    //     selectedArtists.map((artist) => {
    //         search(artist.name, opts, function (err, results) {
    //             if (err) return console.log(err);
    //             dispatchVideo({
    //                 type: 'ADD_VIDEO',
    //                 payload: {
    //                     id: artist.id,
    //                     videos: results.filter((video) => video.kind === 'youtube#video')
    //                 }
    //             })
    //         });
    //     })
    // }

    const onClickVideo = (id) => {
        dispatchVideo({
            type: 'SELECT_VIDEO',
            payload: id
        })
    }

    const Artist = styled.li`
    background: ${props => props.selected ? "green" : "white"};`

    return (
        <div>
            <h3>Videos</h3>
            <ul>
                {musicList
                    .filter((artist) => artist.selected === true)
                    .map((artist) => {
                        console.log('videoLink', artist.videoLink);
                        return <Artist
                            key={artist.id}
                            onClick={() => onClickVideo(artist.id)}
                            selected={artist.videoSelected === true ? true : false}
                        >
                            <iframe src={`https://www.youtube.com/embed/${artist.videoLink[0]}`} />
                        </Artist>
                    })
                }
            </ul>
            {/* <button> Back to search </button> */}
            <button onClick={() => page({ type: 'SEARCH'})}> Back to search </button>
            {/* <button> Back to similar artists </button> */}
            <button onClick={() => page({ type: 'SIMILAR'})}> Back to similar artists </button>
        </div>
    )
    // } else if (musicList) {
    //     return (
    //         <div>
    //             <form onSubmit={handleSubmit}>
    //                 <p> click to generate playlist</p>
    //             </form>
    //         </div>
    //     )
    // }
    return 'no playlist to show'
}

export default Playlist