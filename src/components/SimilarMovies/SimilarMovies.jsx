import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { Image } from 'semantic-ui-react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from 'axios'
import { Link } from 'react-router-dom'
import StyledSimilar from './SimilarMovies.styled'

const SimpleSlider = ({movieId}) =>{
    const api_key = '1ea7ac90e55beb953ffcdb03733ccf92'

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const [similarMovies, setsimilarMovies] = useState([]);

    useEffect(() => {
        (async ()=>{
            const simMov = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US&page=1`)
            
            
            setsimilarMovies(simMov.data.results)
            console.log(simMov.data.results);
   
           })();
    },[])

    return (
        <StyledSimilar>
            <h1>Similar movies</h1>
            <Slider {...settings}>
                {similarMovies.map((movie, i)=>(
                    <Link className='similar' key={movie.id} to={`/movies/${movie.id}`}>
                    {
                        movie.backdrop_path === null ? <Image src={`https://image.freepik.com/photos-gratuite/texture-pierre-noire-vue-dessus_88281-3900.jpg`}/> : <Image src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}/>
                    }
                        <h3>{movie.original_title}</h3>
                    </Link>
                ))}
            </Slider>
        </StyledSimilar>
    )
}
export default SimpleSlider;