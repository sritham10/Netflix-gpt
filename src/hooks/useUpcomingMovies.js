import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies} from "../utils/moviesSlice";

const useUpcomingMovies = () => {

    // For Browse Route
    const dispatch = useDispatch();

    const upcomingMovies= useSelector(store => store?.movies?.upcomingMovies);
    console.log('now ' + upcomingMovies);

    useEffect(() => {
        const getUpcomingMovies = async() => {
            try{    
                const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', API_OPTION);
                const json = await data.json();
                console.log(json);
                dispatch(addUpcomingMovies(json.results));
            }catch(err){
                console.log(err.message);
            }
        };
    
        getUpcomingMovies();
    
    }, []); 

};

export default useUpcomingMovies;