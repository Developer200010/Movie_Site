import React from 'react'
import { useGlobalContext } from './Context'
import Movie from './Movie'
import './Home.css'
import Search from './Search'
function Home() {
  const name= useGlobalContext()
  return (
    <>
    <Search/>
    <Movie/>
    
    </>
  )
}

export default Home