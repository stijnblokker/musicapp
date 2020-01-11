import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import search from 'youtube-search';

import { music } from '../App'

const Playlist = ({ musicList }) => {
    const dispatchVideo = useContext(music)
    const [generate, setGenerate] = useState(false)

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
                dispatchVideo({
                    type: 'ADD_VIDEO',
                    payload: {
                        id: artist.id,
                        videos: results.filter((video) => video.kind === 'youtube#video')
                    }
                })
            });
        })
    }

    const onClickVideo = (id) => {
        dispatchVideo({
            type: 'SELECT_VIDEO',
            payload: id
        })
    }

    const Artist = styled.li`
    background: ${props => props.selected ? "green" : "white"};`

    if (musicList && generate) {

        return (
            <div>
                <h3>RESULT</h3>
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
                            
                                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/VKxT14S5MxU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                            
                            
                            
                            
                            </Artist>
                        })
                    }
                </ul>
                <form>
                    <button type="submit"> Save Playlist</button>
                </form>
            </div>
        )
    } else if (musicList) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <p> click to generate playlist</p>
                    <button type="submit"> Show results! </button>
                </form>
            </div>
        )
    }
    return 'no playlist to show'
}

export default Playlist