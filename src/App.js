import React, { createContext, useReducer } from 'react';

import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
// import Playlist from './components/Playlist';

export const music = createContext('music')
export const video = createContext('playlist')

const initialList = null
const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      console.log('ADDING');
      return action.payload.map(artist => {
        return {
          id: artist.mbid,
          name: artist.name,
          selected: false
        }
      })
    case 'SELECT':
        return state.map ( artist => artist.id === action.payload ? { ...artist, selected: !artist.selected } : artist)
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
      {/* <video.Provider value={'blabla'}>
        <Playlist />
      </video.Provider> */}
    </music.Provider>
  );
}

export default App;
