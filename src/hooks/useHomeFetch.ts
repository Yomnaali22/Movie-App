import { useState, useEffect } from "react";
// Api
import API, { Movie } from "../API";
// Helpers
import { isPresistedState } from "../helpers";

// State object
const intialState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [state, setState] = useState(intialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setError(false);
      // Show Loading flag while fetching movie
      setLoading(true);

      // Fetch Movies
      const movies = await API.fetchMovies(searchTerm, page);

      // Set the state
      setState((prev) => ({
        // Spread the movies object
        ...movies,
        results:
          // Check if page is greater than one before adding more movies
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Search and initial render
  useEffect(() => {
    // Check if intialstate exist in session storage and retrieve it
    if (!searchTerm) {
      const sessionState = isPresistedState("homeState");
      if (sessionState) {
        console.log("grabbing");
        setState(sessionState);
        return;
      }
    }
    setState(intialState);
    fetchMovies(9, searchTerm);
    // Trigger that each time the user search for a movie
  }, [searchTerm]);

  // Load more
  useEffect(() => {
    // Exclude the case where isloading is false
    if (!isLoadingMore) return;
    // Incresse the page number "load the next page" if isloading is true
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [sessionStorage, state]);

  return {
    state: state,
    loading,
    error,
    setSearchTerm,
    searchTerm,
    setIsLoadingMore,
    isLoadingMore,
  };
};
