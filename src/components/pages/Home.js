import React from "react";
//config
import { 
    POSTER_SIZE,
    BACKDROP_SIZE, 
    IMAGE_BASE_URL
} from '../../config'
//components
import HeroImage from "../HeroImage/heroImage";
import Grid from "../Grid/Grid";
import Thumb from "../Thumb/thumb";
import Spinner from './../Spinner/spinner'
import SearchBar from './../../components/SearchBar/searchBar'
import Button from "../Button/button";
//hook
import { useHomeFetch } from "../../hooks/useHomeFetch";
//image
import noPosterFound from '../../images/no_image.jpg'

const Home = () => {
    //destructring the returned object from hook
    const { 
        state, 
        loading, 
        error,
        setSearchTerm, 
        searchTerm,
        setIsLoadingMore
    } = useHomeFetch();

    const image = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0]?.backdrop_path}`
    const title = state.results[0]?.original_title
    const text = state.results[0]?.overview

    if (error) return <div>Something went wrong...!</div>;
    return(
        <>
        {/** if there's a search term don't render the hero image */}
        {!searchTerm && 
            state.results[0]? (
                <HeroImage
                image={image}
                title={title}
                text={text}
                />
            ): null
        }
        <SearchBar setSearchTerm={setSearchTerm}/>
        {/**
         * grid is a dynamic component that can be reused
         * used in home and in movie 
         * renders thumb and actor comp
         */}
        <Grid headers={searchTerm? 'Search Result' : 'Popular Movies'}>
            {
                state.results.map(movie => (
                    <Thumb
                    key={movie.id}
                    clickable={true}
                    image={
                        movie.poster_path?
                        `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`: noPosterFound
                    }
                    movieId={movie.id}
                    />

                ))
            }
        </Grid>
       {loading && <Spinner />}
        {/* if for example the page is 1 and since one is less than the number of total pages it will show us the rest of the pages */}
        {state.page < state.total_pages && !loading && (
            <Button text='Load More' callback={() => setIsLoadingMore(true)}/>
        )}
        </>
    )

}


export default Home;