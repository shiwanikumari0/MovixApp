import React from 'react'
import { useMovies } from '../context/MovieContext'
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import CardContainer from '../components/CardContainer';
import Hero from '../components/Hero';
function Home() {
  // const {movies, error, loading} = useMovies()
  // console.log(movies);
  
  return (
    <div>
      <Navbar/>
      <Hero/>
      <CardContainer/>

    </div>
  )
}

export default Home