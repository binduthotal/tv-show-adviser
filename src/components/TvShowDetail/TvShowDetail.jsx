import s from "./style.module.css";
import { FiveStarRating } from "../FiveStarRating/FiveStarRating";

export function TvShowDetail({ tvshow }) {
    const rating = tvshow.vote_average / 2;
    return (
        <div>
            <div className={s.title}>{tvshow.name}</div>
            <div className={s.rating_container}>
                <FiveStarRating rating = {rating}/>
                <span className={s.rating}>{rating}/5</span>
            </div>
            <div className={s.overview}>{tvshow.overview}</div>
        </div>
    );
}
