import React, { useContext, useState } from 'react'
import styled from 'styled-components';

// import Player from './Player'
import { video } from '../App'

const Playlist = ({ videoList, page }) => {
    const dispatch = useContext(video)
    const [showPlaylist, setShowPlaylist] = useState(false)

    const Artist = styled.li`
    background: ${props => props.show ? "green" : "white"};`

    const selectOtherVideo = (id) => {
        dispatch({
            type: 'CHANGE_VIDEO',
            payload: id
        })
    }

    const playlist = videoList
        .reduce((url, currentVideo) => {
            console.log('playlistvideo', currentVideo);
            
            if (url.length === 0) {
                return `${currentVideo.videos[currentVideo.videoSelected].id}?playlist=`
            }
            return url + `${currentVideo.videos[currentVideo.videoSelected].id},`
        }, "")
        .slice(0, -1)

    console.log(playlist);
    
    return (
        <div>
            <ul>
                {videoList
                    .map((video) => {
                        return (
                            <li key={video.id}> <h3>{video.artist}</h3>
                                <img src={video.videos[video.videoSelected].thumbnails.default.url} width="120px" heigh="90px" />
                                {video.videos[video.videoSelected].title}
                                <br />
                                <button onClick={() => selectOtherVideo(video.id)}> try another video </button>
                            </li>
                        )
                        // <Player artist={artist} />
                        // <Artist
                        //     key={artist.id}
                        //     show={artist.showVideo === true ? true : false}
                        // > <h4>{artist.name}</h4>
                        //     <iframe src={`https://www.youtube.com/embed/${artist.videoLink[artist.videoSelected]}`} />
                        //     <br />
                        // </Artist>
                    })
                }
            </ul>
            <button onClick={() => setShowPlaylist(true)}> Show playlist </button>
            {showPlaylist && <iframe width="560" height="315" src={`http://www.youtube.com/embed/${playlist}`} frameborder="0" allowfullscreen />}
        </div>
    )

    // return (
    //     <div>
    //         <h3>Videos</h3>
    // <ul>
    //     {musicList
    //         .filter((artist) => artist.selected === true)
    //         .reduce((full, artist) => {
    //             return queue += `,${artist}`
    //         })
    //         .map((artist) => {
    //             console.log('artist', artist, 'length', artist.videoLink.length);
    //             return
    //             // <Player artist={artist} />
    //             // <Artist
    //             //     key={artist.id}
    //             //     show={artist.showVideo === true ? true : false}
    //             // > <h4>{artist.name}</h4>
    //             //     <iframe src={`https://www.youtube.com/embed/${artist.videoLink[artist.videoSelected]}`} />
    //             //     <br />
    //             //     <button onClick={() => selectOtherVideo(artist.id)}> try another video </button>
    //             // </Artist>
    //         })
    //     }
    // </ul>
    //         <button onClick={() => page({ type: 'SEARCH' })}> Reset & search again </button>
    //     </div>
    // )
}

export default Playlist