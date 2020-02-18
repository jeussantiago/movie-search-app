import React, { Component } from "react";
import style from './moviepage.module.css';


export default class MoviePage extends Component {
  render() {
    const { title, poster_path, release_date, description, vote_count } = this.props.location.state;
    const popularity = parseFloat(this.props.location.state["popularity"]).toFixed(2);
    const vote_avg = parseFloat(this.props.location.state["vote_avg"]).toFixed(2);
    return (
      <main id="movieContent" >
        <div className={style.moviePageWrapper}>
          <div className={style.movieContainer}>
            <div className="movieImgContainer">
              <img className={style.moviePoster} src={poster_path} alt={`${title} poster`} />
            </div>
            <div className={style.movieInfoContainer}>
              <div className="movieTitleContianer">
                <h1 className={style.movieTitle}>{title}</h1>
              </div>
              <div className={style.movieReleaseContainer}>
                <b className={style.movieStatsLabel}>realese date: </b>
                <div className={style.movieStatsValue}>{release_date}</div>
              </div>
              <div className={style.movieOverviewContainer}>
                <h3 className={style.movieOverviewLabel}>Synopsis</h3>
                <p className={style.movieOverview}>{description}</p>
              </div>
              <div className={style.movieStats}>
                <div className={style.movieStatsContainer}>
                  <b className={style.movieStatsLabel}>popularity: </b>
                  <div className={style.movieStatsValue}>{popularity}</div>
                </div>
                <div className={style.movieStatsContainer}>
                  <b className={style.movieStatsLabel}>Total Number of Votes: </b>
                  <div className={style.movieStatsValue}>{vote_count}</div>
                </div>
                <div className={style.movieStatsContainer}>
                  <b className={style.movieStatsLabel}>Vote Average: </b>
                  <div className={style.movieStatsValue}>{vote_avg}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
