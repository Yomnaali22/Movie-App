import { useState, useEffect, useCallback } from "react";
// Helpers
import { isPresistedState } from "../helpers";
// Api
import API, { Movie, Cast, Crew } from "../API";

// Types
export type MovieState = Movie & {
  actors: Cast[];
  directors: Crew[];
};

export const useMovieFetch = (movieId: number) => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      // Fetch Movie
      const movie = await API.fetchMovie(movieId);
      // Fetch credits
      const credits = await API.fetchCredits(movieId);
      // Get directors only
      const directors = credits.crew.filter(
        (member) => member.job === "Director"
      );
      // Set the state
      setState({
        // Spreading the Movie object
        ...movie,
        actors: credits.cast,
        directors,
      });
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  useEffect(() => {
    // Check for an existing movie id
    const sesssionState = isPresistedState(movieId.toString());
    if (sesssionState) {
      setState(sesssionState);
      setLoading(false);
      return;
    }
    fetchMovie();
  }, [movieId, fetchMovie]);

  // Write to session storage
  useEffect(() => {
    sessionStorage.setItem(movieId.toString(), JSON.stringify(state));
  }, [movieId, state]);

  return {
    state,
    loading,
    error,
  };
};
