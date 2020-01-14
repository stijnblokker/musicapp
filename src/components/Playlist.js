import React, { useContext, useState } from 'react'

// import Player from './Player'
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

    return (
        <div>
            <ul>
                {videoList
                    .map((video) => {
                        return (
                            <li key={video.id}> <h3>{video.artist}</h3>
                                <img src={video.videos[video.videoSelected].thumbnails.default.url} width="120px" heigh="90px" alt={`cover of ${video.artist}`} />
                                {video.videos[video.videoSelected].title}
                                <br />
                                <button onClick={() => selectOtherVideo(video.id)}> try another video </button>
                                <button onClick={() => changeOrder(video.id, -1)}> MOVE UP </button>
                                <button onClick={() => changeOrder(video.id, 1)}> MOVE DOWN </button>
                                <button onClick={() => hideVideo(video.id)}> Hide video </button>
                            </li>
                        )
                    })
                }
            </ul>
            {!showPlaylist && <button onClick={() => setShowPlaylist(true)}> Show playlist </button>}
            {showPlaylist && <iframe width="560" height="315" src={`http://www.youtube.com/embed/${playlist}`} frameborder="0" allowfullscreen title="playlist" />}
            <br /><button onClick={() => page({ type: 'SEARCH' })}> search again (your videos are saved) </button>
        </div>
    )

}

export default Playlist