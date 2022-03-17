import React from "react";
//components
import Thumb from "../Thumb/Thumb";
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//image
//@ts-ignore
import noImageFound from "../../images/no_image.jpg";
//styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";

//helpers
import { generate_id } from "../../helpers";

//Types
import { MovieState } from "../../hooks/useMovieFetch";

type Props = {
  movie: MovieState;
};

const MovieInfo: React.FC<Props> = ({ movie }) => {
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            // Check if movie.poster_path exists
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : noImageFound
          }
          clickable={false}
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>Plot</h3>
          <p>{movie.overview}</p>
          <div className="rating-directors">
            <div>
              <h3>
                Rating
                <div className="score">{movie.vote_average}</div>
              </h3>
            </div>
            <div className="director">
              <h3>
                Director{movie.directors.length > 1 ? "s" : ""}
                {movie.directors.map((director) => (
                  <p key={generate_id(director.credit_id)}>{director.name}</p>
                ))}
              </h3>
            </div>
          </div>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default MovieInfo;
