import React from "react";
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//comps
import Grid from "../Grid/Grid";
import Spinner from "../Spinner/Spinner";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import MovieInfo from "../MovieInfo/MovieInfo";
import Actor from "../Actor/Actor";
//image
//@ts-ignore
import noPosterFound from "./../../images/no_image.jpg";
// Hook
import { useMovieFetch } from "../../hooks/useMovieFetch";
import { useParams } from "react-router-dom";
import MovieInfoBar from "../MovieInfoBar/MovieInfoBar";
import { generate_id } from "../../helpers";

const Movie: React.FC = () => {
  // Taking the movie id from url
  const { movieId } = useParams();

  // Destructring the returned object from hook
  const { state: movie, loading, error } = useMovieFetch(Number(movieId));

  console.log(movie);
  // Show spinner if no movie is fetched
  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={generate_id(Number(actor.credit_id))}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : noPosterFound
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
