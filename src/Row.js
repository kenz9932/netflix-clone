import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url ="https://image.tmdb.org/t/p/original/";


function Row ({ title , fetchUrl, isLargeRow }){

        const [movies, setMovies ] = useState([]);
        const [ trailerUrl, setTrailerUrl ] = useState("");

            // A snippet of code which runs based on a specific conditions
        useEffect (()=>{
            //run once when the row loads, and dont run again
            async function fetchData() {
                const requests = await axios.get(fetchUrl);
                setMovies(requests.data.results);
                return requests;
            }
            fetchData();
        }, [fetchUrl]);

        const opts = {
            height: "390",
            width: "100%",
            playerVars: {
                autoplay: 1, 
            }
        };

        const handleClick = (movie) => {
            if (trailerUrl){
                setTrailerUrl("");
            } else {
                movieTrailer( movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error)=> console.log(error));
            }
        };


        return (
            <div className="row">
                <h2>{title}</h2>

                <div className="class_poster">
                    { /*serveral poster*/ }

                    {movies.map(movies =>(
                        <img
                            key={movies.id}
                            onClick={ ()=> handleClick(movies) }
                            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                            src={`${base_url}${
                                isLargeRow ? movies.poster_path : movies.backdrop_path}`} 
                            alt={movies.name} 
                        />
                    ))}
                </div>
                { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />          }          
            </div>
        );
}

export default Row;