import React, { Component } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import HomeDetailPage from "./HomeDetailPage";
import HomeDetailSideBarTab from "./HomeDetailSideBarTab";
import styles from "./homedetail.module.css";
import CONSTANTS from "../../constants";


const posterWidth = 185;

export default class Home extends Component {
  state = {
    pageNames: ["Now Playing", "Most Popular", "Top Rated", "Upcoming"],
    currentPageName: "Now Playing",
    imtbAPIurls: [`https://api.themoviedb.org/3/movie/now_playing?api_key=${CONSTANTS.KEY.APIKEY}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${CONSTANTS.KEY.APIKEY}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${CONSTANTS.KEY.APIKEY}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${CONSTANTS.KEY.APIKEY}&language=en-US&page=1`],
    currentAPIurl: `https://api.themoviedb.org/3/movie/now_playing?api_key=${CONSTANTS.KEY.APIKEY}&language=en-US&page=1`,
    pageMovies: [],
    titles: [],
    ids: [],
    poster_paths: [],
    release_dates: [],
    descriptions: [],
    popularity: [],
    vote_counts: [],
    vote_avgs: []
  }

  sidebarStyle = classnames(
    "col-2",
    "p-0",
    "border-right",
    styles.sidebar
  )

  updateMovieData = (movieDbAPI) => {
    fetch(movieDbAPI)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(apiData => {
        const data = apiData.results; //api data

        //create space to store data 
        let titlesData = [];
        let idsData = [];
        let posterPathData = [];
        let releaseDatesData = [];
        let descriptionsData = [];
        let popularityData = [];
        let voteCountsData = [];
        let voteAvgsData = [];
        //add each data to corresponding space
        data.forEach((movie) => {
          titlesData.push(movie["title"]) //movie titles
          idsData.push(movie["id"]) //movie id
          posterPathData.push(`https://image.tmdb.org/t/p/w${posterWidth}${movie["poster_path"]}`) //movie poster path
          releaseDatesData.push(movie["release_date"]) //movie release dates
          descriptionsData.push(movie["overview"]) //movie description
          popularityData.push(movie["popularity"])
          voteCountsData.push(movie["vote_count"])
          voteAvgsData.push(movie["vote_average"])
        })
        //modify state data to api data
        this.setState({
          titles: titlesData,
          ids: idsData,
          poster_paths: posterPathData,
          release_dates: releaseDatesData,
          descriptions: descriptionsData,
          popularity: popularityData,
          vote_counts: voteCountsData,
          vote_avgs: voteAvgsData
        })
      })
      .catch(error =>
        this.setState({
          warningMessageOpen: true,
          warningMessageText: `${
            CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET
            } ${error}`
        })
      );
  }

  // Get the sample data from the back end
  componentDidMount() {
    //initial movie data gathering
    this.updateMovieData(this.state.currentAPIurl);
  }

  handleWarningClose = () => {
    this.setState({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  }

  selectPage = (pageName, APIurl) => {
    this.setState({
      currentPageName: pageName,
      currentAPIurl: APIurl
    });
    //update current movie data
    this.updateMovieData(APIurl);

  }

  render() {
    const {
      pageNames,
      currentPageName,
      imtbAPIurls,
      warningMessageOpen,
      warningMessageText
    } = this.state;

    const { titles, ids, poster_paths, release_dates, descriptions,
      popularity, vote_counts, vote_avgs } = this.state;

    return (
      <main id="mainContent">
        <div className="container-fluid">
          <div className="row">
            <div className={this.sidebarStyle} >
              <div className={classnames("list-group", "list-group-flush", "border-bottom", styles.sidebarWrapper)}>
                {pageNames.map((_, i) => (
                  <HomeDetailSideBarTab
                    selectPage={this.selectPage}
                    pageName={pageNames[i]}
                    APIurl={imtbAPIurls[i]}
                    key={i}
                  />
                ))}
              </div>
            </div>
            <HomeDetailPage
              pageTitle={currentPageName}
              titles={titles}
              ids={ids}
              poster_paths={poster_paths}
              release_dates={release_dates}
              descriptions={descriptions}
              popularitys={popularity}
              vote_counts={vote_counts}
              vote_avgs={vote_avgs}
            />
          </div>
        </div>
        <WarningMessage
          open={warningMessageOpen}
          text={warningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </main>
    );
  }
}
