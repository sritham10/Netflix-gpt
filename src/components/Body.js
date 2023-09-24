import { createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import MovieInfo from "./MovieInfo.js"
import {RouterProvider} from "react-router-dom"
const Body = () => {
 
 
    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>,
        },
        {
            path:"/browse",
            element:<Browse/>,
        },
         {
            path:"/movie/:id",
            element:"<MovieInfo/>",

         }
      ]);


  return (
    <div>
         
        <RouterProvider router={appRouter}/>
      
    </div>
  )
}

export default Body
