import { useState, useEffect, useCallback } from "react";
//helpers 
import { isPresistedState } from "../helpers";
import API from './../API'

export const useMovieFetch = movieId => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    //this function gets recreated on each rendedr and will cause an infinity loop 
    //that's why we wrap it into useCallback hook
    //so it won't get recreated unless the movie id changes
    //prevents recreating the function on each render
    const fetchMovie = useCallback(async ()=> {
        try{
            setLoading(true);
            setError(false);
            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            //get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );
            //setting state
            setState({
                //spreading movie 
                ...movie,
                actors: credits.cast, 
                directors
            })
            setLoading(false)
            //console.log(movie, credits)
        } catch(error){
            setError(true)
        }
    }, [movieId]);

    useEffect(() => {
        //check for movie id and return it if found
        const sesssionState = isPresistedState(movieId);
        if(sesssionState){
            setState(sesssionState);
            setLoading(false);
            return;
        }
        fetchMovie();
    }, [movieId, fetchMovie]);

    //write to session storage
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state))
    }, [movieId, state])
    

    return {
        state, loading, error
    }
}


//why infininty loop happens in useEffect 
//why use callbackhook?