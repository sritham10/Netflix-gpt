import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo :null,
        topRatedMovies: null,
        movieInfo: {
            movieDetails: null,
            castInfo: null,
            trailer: null
        },
    },
    reducers:{
        addNowPlayingMovies:(state,action ) =>{
            state.nowPlayingMovies=action.payload;
        },
        addPopularMovies:(state,action ) =>{
            state.popularMovies=action.payload;
        },
        addUpcomingMovies:(state,action ) =>{
            state.upcomingMovies=action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addTrailerVideo:(state,action) =>{
           state.trailerVideo =action.payload;
        },
        addMovieInfo: (state, action) => {
            state.movieInfo.movieDetails = action.payload;
        },
        addCastInfo: (state, action) => {
            state.movieInfo.castInfo = action.payload;
        },
        addMovieTrailers: (state, action) => {
            state.movieInfo.trailer = action.payload;
        },
        removeMovieInfo: (state) => {
            state.movieInfo.movieDetails = null;
            state.movieInfo.castInfo = null;
            state.movieInfo.trailer = null;
        }
    }
})


export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies, addMovieInfo, removeMovieInfo, addMovieTrailers, addCastInfo, addTopRatedMovies, addUpcomingMovies} =moviesSlice.actions;

export default moviesSlice.reducer;