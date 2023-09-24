import React, { useRef } from 'react'
import lang from "../utils/languageConstants"
import {useDispatch, useSelector} from "react-redux"
import openai from '../utils/openai';
import { addGptMovieResult,setGptLoading } from '../utils/gptSlice';
import { API_OPTION } from '../utils/constants';
import { useState } from 'react';


const GptSearchBar = () =>{
  const dispatch = useDispatch();
  const langKey = useSelector((store)=>store.config.lang);
  const searchText = useRef(null);
  const [ error, setError] = useState(false);

     const searchMovieTMBD = async(movieName) => {
      try{   
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, API_OPTION);
    
          const json = await data.json()
          return json.results;
        }catch(err){
          console.log(err.message);
          setError(err.message);
      }
  }


  const handleGPtSearchClick = async()=>{
    //make an apt call to gpt ai and get movie results
    try{
      dispatch(setGptLoading(true));
     const gptQuery ="Act as a Movie Recommendation system and suggest some movies for the query :" + searchText.current.value + ". only give me names pf 5 movies,comma seperatedlike the example result given ahead. Example Result : Gadar,Sholay,Don,Golmaal,Koi Mil Gaya";

     const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    if(!gptResults.choices){
      setError(true);
    }
    setError(false);
  

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map(movie=>searchMovieTMBD(movie));
    console.log(promiseArray );
     const tmbdResults =await Promise.all(promiseArray);
     console.log(tmbdResults);
    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmbdResults})); 
    dispatch(setGptLoading(false));
  
  }catch(err){
    console.log(err.message);
    dispatch(setGptLoading(false));
    setError(err.message);
  }

}


  return  error ? (<h1>error</h1>):(
    <div className= 'pt-[35%] md:pt-[10%] flex justify-center'>
      <form className=' w-full  n  md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchText} 
        type ="text" 
        className='p-4 m-4 col-span-9'
         placeholder={lang[langKey].gptSearchPlaceholder}>
         </input>
        <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
        onClick={handleGPtSearchClick}
        >{lang[langKey].search}</button>

      </form>
    </div>
  )
};

export default GptSearchBar;
