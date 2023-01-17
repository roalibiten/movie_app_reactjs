import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css'
import SearchIcon from "./search.svg"
import DetailScreen from './DetailScreen';



// API_KEY = f783161d
const API_URL= "https://omdbapi.com?apikey=f783161d"

const App = () => {

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const [detailScreen, setDetailScreen] = useState(false)
  const [imdbID,setimdbID] = useState("")

  const searchMovie = async() => {
    setPage(1); 
    const response = await fetch(`${API_URL}&s=${searchTerm}&page=${1}`)
    const data = await response.json()
    setMovies(data.Search)
  } 
  const fetchMovies = async() => {    
    setPage(1); 
    const response = await fetch(`${API_URL}&s=gentlemen&page=${1}`)
    const data = await response.json()
    setMovies(data.Search)
  } 

  const loadMore= async()=>{
    var URL;
    if(searchTerm==""){
      URL = `${API_URL}&s=gentlemen&page=${page+1}`
    }else{
      URL = `${API_URL}&s=${searchTerm}&page=${page+1}`
    }
    const response = await fetch(URL)
    const data = await response.json()
    setMovies((prevMovies)=>[...prevMovies,...data.Search])
    setPage((prevPage)=>prevPage+1)

  }

  useEffect(()=>{
    fetchMovies()
  },[])

  return (
    <div className="app">
      <h1>ROVLI Movies</h1>
      
      <div className="search">
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e)=>{setSearchTerm(e.target.value)}}
        />
        <img 
          src={SearchIcon} 
          alt="search"
          onClick={()=>{
            if(searchTerm==""){
              alert("Enter a word to search")
              return null
            }
           searchMovie(); }}
        />
      </div>

      {movies?.length>0 ? (
        <div className='container'>
          {movies.map((movie)=>{
            return(
                <MovieCard onClick={()=>{setimdbID(movie.imdbID); setDetailScreen(true);}}  key={movie.imdbID} movie={movie}/>
            )
          })}
          </div>
        ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
      {movies?.length>0 ? (

        <div>
            <button onClick={()=>{loadMore()}}>Load More</button>
        </div>
      ):(
        null
      )}
      
      {detailScreen? (
        <div className='detailScreen'>
          <DetailScreen closeDetailScreen={()=>{setDetailScreen(false)}} imdbID={imdbID}/>
        </div>
      ): null}

    </div>
  );
}

export default App;
