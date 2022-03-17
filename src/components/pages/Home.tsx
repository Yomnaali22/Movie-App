import React from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";

// Components
import HeroImage from "../HeroImage/HeroImage";
import Grid from "../Grid/Grid";
import Thumb from "../Thumb/Thumb";
import Spinner from "./../Spinner/Spinner";
import SearchBar from "./../../components/SearchBar/SearchBar";
import Button from "../Button/Button";

// Hook 
import { useHomeFetch } from "../../hooks/useHomeFetch";
// Image
// @ts-ignore
import noPosterFound from "../../images/no_image.jpg";
import { generate_id } from "../../helpers";

const Home: React.FC = () => {
  // Destructring the returned object from hook
  const { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore } =
    useHomeFetch();

  console.log("hello", state.results);
  const image = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0]?.backdrop_path}`;
  const title = state.results[0]?.original_title;
  const text = state.results[0]?.overview;

  if (error) return <div>Something went wrong...!</div>;
  return (
    <>
      {/** If there's a search term don't render the hero image */}
      {!searchTerm && state.results[0] ? (
        <HeroImage image={image} title={title} text={text} />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />

      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {
          // Render movies
          state.results.map((movie) => (
            <Thumb
              key={generate_id(movie.id)}
              clickable={true}
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : noPosterFound
              }
              movieId={movie.id}
            />
          ))
        }
      </Grid>
      {/* Show spinner icon only if loading is true */}
      {loading && <Spinner />}
      {/* Load more as long as the page isn't equal to the total pages and show the loading button */}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </>
  );
};

export default Home;
