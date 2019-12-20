import React, { createContext, useReducer } from 'react';

import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
import Playlist from './components/Playlist';

export const music = createContext('music')
export const video = createContext('playlist')

const initialList = null
const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      console.log('ADDING');
      return action.payload
    case 'SELECT':
      const { mbid, name, url } = action.payload
      let addToState
      if (action.payload.selected) {
        addToState = {
          mbid, name, url,
          selected: !action.payload.selected
        }
      } else {
        addToState = {
          mbid, name, url,
          selected: true
        }
      }
      console.log(addToState);
      return [...state.filter((artist) => artist.mbid !== mbid), addToState]
    default:
      return state
  }
}

const App = () => {

  const [musicList, DispatchMusicList] = useReducer(listReducer, initialList)
  return (
    <music.Provider value={DispatchMusicList}>
      <SearchBar />
      <video.Provider value={'blabla'}>
        <SearchResult musicList={musicList} />
        <Playlist />
      </video.Provider>
    </music.Provider>
  );
}

export default App;
