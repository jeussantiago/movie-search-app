import React, { Component } from "react";
import { Link } from "react-router-dom";
// import classnames from "classnames";
import styles from "./homedetail.module.css";

const posterWidth = 185;
const posterMoviePageWidth = 400;

export default class MasterDetailPage extends Component {
  state = {
    titles: []
  }


  movieItems = () => {
    //get data 
    const { titles, ids, poster_paths, release_dates, descriptions,
      popularitys, vote_counts, vote_avgs } = this.props;

    //iterate though data
    return titles.map((_, i) => {
      //movie poster css
      let movieWrapper = {
        background: `url('${poster_paths[i]}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "auto",
        width: "185px",
        height: "280px",
        padding: "0"
      }
      //movie link
      let moviePath = titles[i].replace(/\s+/g, '-').toLowerCase();

      return (
        <div key={ids[i]} >
          <div style={movieWrapper} className={styles.movieItem}>
            <div className={styles.movieItemContent}>
              <div>{titles[i]}</div>
              <Link to={{
                pathname: `movie/${moviePath}`,
                state: {
                  title: `${titles[i]}`,
                  id: `${ids[i]}`,
                  poster_path: `${poster_paths[i].replace(posterWidth, posterMoviePageWidth)}`,
                  release_date: `${release_dates[i]}`,
                  description: `${descriptions[i]}`,
                  popularity: `${popularitys[i]}`,
                  vote_count: `${vote_counts[i]}`,
                  vote_avg: `${vote_avgs[i]}`
                }
              }}>see details</Link>
            </div>
          </div>
        </div>
      )
    })
  }


  render() {
    const { pageTitle } = this.props;

    return (
      <div className="col">
        {/* <div className={classnames("row", styles.heading)}>
          <div className="col">
            <h3 className="ml-3 mb-4">{pageTitle}</h3>
            (maybe put picture here)
          </div>
        </div> */}
        <div className="row justify-content-center">
          <div className="row py-5">
            <h1>{pageTitle}</h1>
          </div>

          <div className="row w-100">
            {this.movieItems()}
          </div>
        </div>
      </div>
    )
  }

}

