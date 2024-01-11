import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import {api} from "./Context"
function SingleMovie() {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie]= useState([]);
  const getMovie=async(url)=>{
    try {
      setIsLoading(true)
      const res= await fetch(url);
      const data =await res.json();
      if(data.Response === "True"){
        setMovie(data)
      }else{
         setIsError({
            show:true,
             msg:data.Error,
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    var timerOut=setTimeout(()=>{
      getMovie(`${api}&i=${id}`);

    },500)
    return ()=> clearTimeout(timerOut)
  })
  if(isLoading){
    <div className="movie-section">
      <div className="loading">Loading...</div>
    </div>
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <img src={movie.Poster} alt="" />
      
      <div className="card-content">
        <p className="title">{movie.Title}</p>
        <p className="card-text">{movie.Released}</p>
        <p className="card-text">{movie.Genre}</p>
        <p className="card-text">{movie.imdbRating}</p>
        <p className="card-text">{movie.Country}</p>
        <NavLink to="/" className='back-btn'>Go back</NavLink>
      </div>
      </div>
    </section>
  )
}

export default SingleMovie