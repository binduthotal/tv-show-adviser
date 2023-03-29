import s from "./style.module.css";
import { TvShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config.js";
import { TvShowDetail } from "./components/TvShowDetail/TvShowDetail";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/logo.png";
import { TvShowList } from "./components/TvShowList/TvShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
    const [currentTvShow, setCurrentTvShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        try{
        const popularTvShowList = await TvShowAPI.fetchPopulars();
        if (popularTvShowList.length > 0) {
            setCurrentTvShow(popularTvShowList[0]);
        }
    }catch(error){
        alert("Something went wrong when fetching the popular tv show list")
    };
    }

    async function fetchRecommendations(tvShowId) {
        try{
        const recommendationListResp = await TvShowAPI.fetchRecommendations(tvShowId);
        if (recommendationListResp.length > 0) {
            setRecommendationList(recommendationListResp.slice(0, 10));
        }
    }catch(error){
        alert("Something went wrong when fetching recommendations")
    }
    }

    async function fetchByTitle(title) {
        try{
        const searchResponse = await TvShowAPI.fetchByTitle(title);
        if (searchResponse.length > 0) {
            setCurrentTvShow(searchResponse[0]);
        }
    }catch(error){
        alert("Something went wrong in searching tv show")
    }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTvShow) {
            fetchRecommendations(currentTvShow.id);
        }
    }, [currentTvShow]);

    function updateCurrentTvShow(tvShow) {
        setCurrentTvShow(tvShow);
    }
    return (
        <div
            className={s.main_container}
            style={{
                background: currentTvShow
                    ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
            url("${BACKDROP_BASE_URL}${currentTvShow.backdrop_path}") no-repeat center / cover`
                    : "black",
            }}
        >
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo
                            img={logoImg}
                            title={"Watowatch"}
                            subtitle={"Find the show you may like"}
                        />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <SearchBar onSubmit={fetchByTitle} />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_details}>
                {currentTvShow && <TvShowDetail tvshow={currentTvShow}></TvShowDetail>}
            </div>
            <div className={s.recommended_shows}>
                {currentTvShow && <TvShowList tvShowList={recommendationList} onClickItem={updateCurrentTvShow} />}
            </div>
        </div>
    );
}
