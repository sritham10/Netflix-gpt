import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {

    // For Browse Route
    const dispatch = useDispatch();

    const popularMovies= useSelector(store => store?.movies?.popularMovies);
    console.log('now ' + popularMovies);

    useEffect(() => {
        const getPopularMovies = async() => {
            try{    
                const data = await fetch('https://api.themoviedb.org/3/movie/popular', API_OPTION);
                const json = await data.json();
                console.log(json);
                dispatch(addPopularMovies(json.results));
            }catch(err){
                console.log(err.message);
            }
        };
    
        getPopularMovies();
    
    }, []); 

};

export default usePopularMovies;