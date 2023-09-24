import React from 'react'
import GptSearchbar from './GptSearchbar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
       <div className="fixed -z-10">
      <img src={BG_URL}
      alt="logo"
      />
      </div>
      <GptSearchbar></GptSearchbar>
      <GptMovieSuggestions></GptMovieSuggestions>
      
    </div>
  )
}

export default GptSearch
