import "./App.css";
import React from "react";
import searchIcon from "./search.svg";
import {useEffect, useState} from "react";
import MovieCart from "./MovieCart";

const API_URL = "http://www.omdbapi.com/?apikey=e9a76a7f";

function App() {


  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data)
  }

  useEffect(() => {
        searchMovies("everybody hates chris");
  }, []);

  return (

  <>
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input type="text" placeholder="search for movies" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} />
        <img className="search-img" src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
    </div> 

    {
      movies?.length > 0 
        ? (
          <div className="container">
            {movies.map((movie, index) => (
              <MovieCart key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )
    }


   
  </>
  
  );
}

export default App;
