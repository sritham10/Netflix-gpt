import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({

    name:'gpt',
    initialState : {
        showGptSearch:false,
        gptMovies:null,
        movieResults:null,
        movieNames : null,
        gptLoading: false
    },
    reducers : {
        toggleGptSearchView:(state) =>{
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult:(state,action) => {
            const {movieNames,movieResults} = action.payload;
          state.movieNames = movieNames;
          state.movieResults = movieResults;

        },
        removeGptMovies: (state) => {
            state.movieData = null;
            state.movieNames = null;
        },
        setGptLoading: (state, action) => {
            state.gptLoading = action.payload;
        }

    }
});
export const {toggleGptSearchView,addGptMovieResult,removeGptMovies,setGptLoading} = gptSlice.actions;
export default gptSlice.reducer;