import React, { createContext, useReducer } from 'react';
import './index.css';

import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
import Playlist from './components/Playlist'

export const music = createContext('music')

const initialList = null
const listReducer = (state, action) => {
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
      const {id, videos} = action.payload
      console.log('id', id);
      console.log('videos', videos);
      return state.map(artist => artist.id === id ? { ...artist, videoLink: videos.map((video) => video.id) } : artist)
    case 'SELECT_VIDEO':
    // return state.map ( artist => artist.id === action.payload ? { ...artist, videoSelected: !artist.videoSelected } : artist)
    default:
      return state
  }
}

const App = () => {
  const [musicList, DispatchMusicList] = useReducer(listReducer, initialList)

  return (
    <music.Provider value={DispatchMusicList}>
      <SearchBar />
      <SearchResult musicList={musicList} />
      <Playlist musicList={musicList} />
    </music.Provider>
  );
}

export default App;
