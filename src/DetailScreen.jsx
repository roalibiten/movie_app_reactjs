import React, { useEffect, useState } from 'react'


// API_KEY = f783161d
const API_URL= "https://omdbapi.com?apikey=f783161d"

export default function DetailScreen(props) {
    const [movie,setMovie] = useState({})
    const fetchDetail = async() => {    
        const response = await fetch(`${API_URL}&i=${props.imdbID}`)
        const data = await response.json()
        console.log(data)
        setMovie(data)
    }
    useEffect(()=>{
        fetchDetail()
    },[])

    return (
        <div className='detailContainer'>
            <div>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://media.comicbook.com/files/img/default-movie.png?auto=webp"} />
            </div>
            <div className='infoContainer'>
                <h3>Title</h3>
                <h4>{movie.Title}</h4>
                <h3>Genre</h3>
                <h4>{movie.Genre}</h4>
                <h3>Director</h3>
                <h4>{movie.Director}</h4>
                <h3>Actors</h3>
                <h4>{movie.Actors}</h4>
                <h3>Runtime</h3>
                <h4>{movie.Runtime}</h4>
                <h3>Plot</h3>
                <h4>{movie.Plot}</h4>
                <h3>Year</h3>
                <h4>{movie.Year}</h4>
                <h3>IMDB Rating</h3>
                <h4>{movie.imdbRating}</h4>
                <h3>IMDB Votes</h3>
                <h4>{movie.imdbVotes}</h4>
                <h3>Language</h3>
                <h4>{movie.Language}</h4>
                <h3>Country</h3>
                <h4>{movie.Country}</h4>
                <h3>Awards</h3>
                <h4>{movie.Awards}</h4>

            </div>
                            <button onClick={props.closeDetailScreen}>Close</button>

        </div>
    )
}
