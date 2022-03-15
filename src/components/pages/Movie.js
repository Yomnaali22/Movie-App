import React from "react";
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//comps 
import Grid from "../Grid/Grid";
import Spinner from '../Spinner/spinner'
import BreadCrumb from "../BreadCrumb/breadCrumb";
import MovieInfo from '../MovieInfo/MovieInfo'
import Actor from './../Actor/Actor'
//image 
import noPosterFound from './../../images/no_image.jpg'
//hook 
import { useMovieFetch } from "../../hooks/useMovieFetch";
import { useParams } from "react-router-dom";
import MovieInfoBar from "../MovieInfoBar/MovieInfoBar";


const Movie = () => {
    //we are taking the movie id from the url 
    const { movieId } = useParams();
    //renaming the state to movie
    const { state: movie, loading, error } = useMovieFetch(movieId);

    //state loading is default to false and it changes on fetching the movie to true
    //if we don't have the fetched movie show spinner else show movie
    if(loading) return <Spinner/>
    if(error) return <div>
        Something went wrong...
    </div>;
    //console.log(movie)
    
    return(
        <>
        <BreadCrumb movieTitle={movie.original_title}/>
        <MovieInfo movie={movie}/>
        <MovieInfoBar 
        time={movie.runtime} 
        budget={movie.budget} 
        revenue={movie.revenue}
        />
        <Grid headers='Actors'>
            {movie.actors.map(actor => (
                <Actor 
                key={actor.credit_id}
                name={actor.name}
                character={actor.character}
                imageUrl={ actor.profile_path?
            `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            : noPosterFound
                }
                />
            ))}
        </Grid>
        </>
    )
}


export default Movie;