import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { MovieCard } from "../components/MovieCard"

export const Home = () => {
  const [movies, setMovies] = useState([])
  const [searchItem, setSearchItem] = useState("")
  const url = "https://www.omdbapi.com?apikey=49d62ee9"

  const getMovie = async (title) => {
    const response = await fetch(`${url}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  /* Getting data from movie api when page refreshes */
  useEffect(() => {
    getMovie("Superman")
  }, [])
  return (
    <>
      <h1>Movie Search </h1>
      <div className='search'>
        <input
          autoFocus
          type='text'
          placeholder='Search here for movies'
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value)
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          role='button'
          className='fasearch'
          onClick={() => {
            getMovie(searchItem)
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </>
  )
}
