import React from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    return (
        <Link to={`/MovieDetails/${props.id}`} style={{ textDecoration: 'none' }}>
            <div className="cards">
                <div class="column">
                    <div class="initialItemThumnail">
                        <img src="${movie.Poster}" alt="" />
                    </div>
                    <div class="initialItemInfo">
                        <h3>${props.Title}</h3>
                        <p>${props.Year}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;