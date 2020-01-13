import React, { createContext, useReducer } from 'react';
import './index.css';

import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
import Playlist from './components/Playlist'

export const music = createContext('music')
export const video = createContext('video')
// export const page = createContext('page')


// CREATE THE LIST WITH ALL THE ARTISTS
const initialMusicList = null
const musicListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ARTISTS':
      return action.payload.map(artist => {
        return {
          id: artist.mbid,
          name: artist.name,
          selected: false,
          // showVideo: true,
          // videoSelected: 0,
          // videoLink: []
        }
      })
    case 'SELECT_ARTISTS':
      return state.map(artist => artist.id === action.payload ? { ...artist, selected: !artist.selected } : artist)
    default:
      return state
  }
}

// CREATES A LIST WITH ALL THE VIDEOS
const initialVideoList = []
const videoListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return [...state, {
        id: action.payload.id,
        artist: action.payload.artist,
        showVideo: true,
        videoSelected: 0,
        videos: action.payload.videos
      }]
    case 'CHANGE_VIDEO':
      return state.map(artist => {
        return artist.id === action.payload ?
          artist.videoSelected < artist.videos.length - 1 ?
            { ...artist, videoSelected: artist.videoSelected + 1 }
            : { ...artist, videoSelected: 0 }
          : artist
      })
    // case 'DELETE_VIDEO':
    //   console.log('delete video');
    //   return state
    default:
      return state
  }
}

// NAVIGATION - WHICH PAGE TO SHOW
const initialPage = { search: true, similar: false, video: false }
const pageReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH':
      return { search: true, similar: false, video: false }
    case 'SIMILAR':
      return { search: false, similar: true, video: false }
    case 'VIDEO':
      return { search: false, similar: false, video: true }
    default:
      return state
  }
}

const App = () => {
  const [musicList, dispatchMusicList] = useReducer(musicListReducer, initialMusicList)
  const [videoList, dispatchVideoList] = useReducer(videoListReducer, initialVideoList)
  const [page, dispatchPage] = useReducer(pageReducer, initialPage)


  return (
    <div>
      {/* <page.Provider value={dispatchPage}> */}
      <music.Provider value={dispatchMusicList}>
        <video.Provider value={dispatchVideoList}>
        <h1>Similar Music Finder</h1>
          {page.search && <SearchBar page={dispatchPage} />}
          {page.similar && <SearchResult musicList={musicList} page={dispatchPage} />}
        {page.video && <Playlist videoList={videoList} page={dispatchPage} />}
        </video.Provider>
      </music.Provider>
      {/* </page.Provider> */}
    </div>
  );
}

export default App;
