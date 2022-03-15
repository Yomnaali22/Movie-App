import { 
    useState,
     useEffect,
     useRef} from "react";
//api
import API from "../API";
//helpers 
import { isPresistedState } from "../helpers";

const intialState = {
    page: 0,
    results: [],
    total_pages: 0, 
    total_results: 0
}
//logic component
export const useHomeFetch = () => {
    const [state, setState] = useState(intialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    //console.log(state)

    const fetchMovies = async (page, searchTerm = '') => {
        try{
            setError(false)
            //while fetching show the loading flag 
            setLoading(true)
            //using the fetchmovies function
            const movies = await API.fetchMovies(searchTerm, page)
            //console.log('the movies: ', movies)
            setState(prev => ({
                //spread the movies object
                ...movies, 
                results:
                //if page is greater than one make an array that have the old array in results which exist in page one 
                //and the new ones with new pages else if we didn't get new movies w load the existing ones
                 page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));
        }
        catch(error){
            setError(true)
        }
        //set loading to false 
        setLoading(false)
    }

    //search and initial render
    useEffect(() => {
        //check if intialstate exist in session storage and retrieve it
       if(!searchTerm){
           const sessionState = isPresistedState('homeState')
           if(sessionState){
               console.log('grabbing')
               setState(sessionState)
               return;
           }
       }
       //otherwise
       console.log('grabbing from api')
       setState(intialState)
        fetchMovies(2, searchTerm)
            //we also want to trigger that each time the user searches a movie
    }, [searchTerm])

    //load more 
    useEffect(() => {
        //we want to exclude the case where isloading is false so it doesn't do anything in this case
      if(!isLoadingMore) return;
      //incresse the page number (load the next page) if isloading is true
      fetchMovies(state.page + 1, searchTerm);

      setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page])
    

    //Write to sessionStorage 
    useEffect(() => {
        if(!searchTerm){
            sessionStorage.setItem('homeState', JSON.stringify(state))
        }
    }, [sessionStorage, state])
    

    return {
        state: state, 
        loading,
        error, 
        setSearchTerm, 
        searchTerm,
        setIsLoadingMore,
        isLoadingMore 
    };
}