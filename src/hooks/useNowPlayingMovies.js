import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {

    // For Browse Route
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store => store?.movies?.nowPlayingMovies);
    console.log('now ' + nowPlayingMovies);

    useEffect(() => {
        const getNowPlayingMovies = async() => {
            try{    
                const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1', API_OPTION);
                const json = await data.json();
                console.log(json);
                dispatch(addNowPlayingMovies(json.results));
            }catch(err){
                console.log(err.message);
            }
        };
    
        getNowPlayingMovies();
    
    }, []); 

};

export default useNowPlayingMovies;