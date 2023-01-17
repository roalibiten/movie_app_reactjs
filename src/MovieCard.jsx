
const MovieCard = ({movie,onClick}) => {

    return (
        <div className='movie' onClick={onClick} >
            <div>
                <p>{movie.Year}</p>
            </div>

            <div>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://media.comicbook.com/files/img/default-movie.png?auto=webp"} />
            </div>

            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )

}

export default MovieCard