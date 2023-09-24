
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const Maincontainer = () => {
  const movies =useSelector((store) => store.movie?.nowPlayingMovies);
  if(!movies){
    return null;
  } 

  const mainMovie = movies[0];

  const {original_title,overview,id} =mainMovie;
  return (
    <div>
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieId={id}/>
      
    </div>
  )
}

export default Maincontainer;