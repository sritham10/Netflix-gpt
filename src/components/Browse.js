
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies' 
import Maincontainer from './Maincontainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch =useSelector(store => store.gpt.showGptSearch)
  console.log('yes browse');
  useNowPlayingMovies();
  console.log('end browse');
  usePopularMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header></Header>
      {showGptSearch?(<GptSearch/>):(
        <>
            <Maincontainer></Maincontainer>
      <SecondaryContainer></SecondaryContainer>
        </>
      )}
    </div>
  )
}

export default Browse
