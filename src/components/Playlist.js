import React, { useContext, useState } from 'react'
import styled from 'styled-components';

import { video } from '../App'

const Playlist = ({ videoList, page }) => {
    const dispatch = useContext(video)
    const [showPlaylist, setShowPlaylist] = useState(false)

    const selectOtherVideo = (id) => {
        dispatch({
            type: 'CHANGE_VIDEO',
            payload: id
        })
    }

    const changeOrder = (id, direction) => {
        dispatch({ type: 'CHANGE_ORDER', payload: { id, direction } })
    }

    const hideVideo = (id) => {
        dispatch({ type: 'HIDE_VIDEO', payload: { id } })
    }

    const playlist = videoList
        .reduce((url, currentVideo) => {
            if (url.length === 0) {
                return `${currentVideo.videos[currentVideo.videoSelected].id}?playlist=`
            }
            return url + `${currentVideo.videos[currentVideo.videoSelected].id},`
        }, "")
        .slice(0, -1)

        const Artist = styled.li`
        opacity: ${props => props.show ? 1 : 0.2};`

    return (
        <div className="main">
            <h3>Step 3. Select video's that you want to put in the playlist</h3>
            <div className="videolist">
                <hr />
                {videoList
                    .map((video) => {
                        return (
                            <Artist className="videoItem" key={video.id} show={video.showVideo === true ? true : false}> <h3>{video.artist}</h3>
                                <img src={video.videos[video.videoSelected].thumbnails.default.url} alt={`cover of ${video.artist}`} />
                                {video.videos[video.videoSelected].title}
                                <br />
                                <button className="smallbutton try" onClick={() => selectOtherVideo(video.id)}> Change video </button>
                                <button className="smallbutton up" onClick={() => changeOrder(video.id, -1)}></button>
                                <button className="smallbutton down" onClick={() => changeOrder(video.id, 1)}> </button>
                                <button className="smallbutton hide" onClick={() => hideVideo(video.id)}> Hide video </button>
                            </Artist>
                        )
                    })
                }
            </div>
            {!showPlaylist && <button onClick={() => setShowPlaylist(true)}> Show playlist </button>} || 
            {showPlaylist && <iframe width="560" height="315" src={`http://www.youtube.com/embed/${playlist}`} frameBorder="0" allowFullScreen title="playlist" />}
            <button onClick={() => page({ type: 'SEARCH' })}> search again (your videos are saved) </button>
        </div>
    )

}

export default Playlist