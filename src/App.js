import React, { createContext, useReducer, useState } from 'react';
import './index.css';

import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
import Playlist from './components/Playlist'

export const music = createContext('music')
export const page = createContext('page')

const initialMusicList = null
const musicListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ARTISTS':
      return action.payload.map(artist => {
        return {
          id: artist.mbid,
          name: artist.name,
          selected: false,
          videoSelected: true,
          videoLink: []
        }
      })
    case 'SELECT_ARTISTS':
      return state.map(artist => artist.id === action.payload ? { ...artist, selected: !artist.selected } : artist)
    case 'ADD_VIDEO':
      const { id, videos } = action.payload
      return state.map(artist => artist.id === id ? artist.videoLink !== 0 ? { ...artist, videoLink: videos.map((video) => video.id) } : artist : artist)
    default:
      return state
  }
}

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
  const [page, dispatchPage] = useReducer(pageReducer, initialPage)
  console.log(page);

  return (
    // <page.Provider value={dispatchPage}>
    <music.Provider value={dispatchMusicList}>
      {page.search && <SearchBar page={dispatchPage} />}
      {page.similar && <SearchResult musicList={musicList} page={dispatchPage} />}
      {page.video && <Playlist musicList={musicList} page={dispatchPage} />}
    </music.Provider>
    // </page.Provider>
  );
}

export default App;
