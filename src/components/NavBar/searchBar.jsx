import React, { Component } from "react";
import { Link } from "react-router-dom";
import CONSTANTS from "../../constants";
import styles from "./navbar.module.css";
import onClickOutside from "react-onclickoutside";
import { withRouter } from 'react-router';

const posterWidth = 185;
const posterMoviePageWidth = 400;

class SearchBar extends Component {
  state = {
    pagePathname: "/",
    isVisible: false,
    searchText: "",
    titles: [],
    ids: [],
    poster_paths: [],
    release_dates: [],
    descriptions: [],
    popularitys: [],
    vote_counts: [],
    vote_avgs: []
  }


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
          popularitys: popularityData,
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

  searchResults = () => {
    //get user search input
    const { searchText } = this.state;

    //if there is something that the user wants to search - make results appear
    if (searchText) {
      // let testSearchAPI = `https://api.themoviedb.org/3/movie/now_playing?api_key=${CONSTANTS.KEY.APIKEY}&language=en-US&page=1`;
      //IMDB search API using user search attribtue
      let searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=4efc28cbfdabb5b3bfe69e60f686dcf6&language=en-US&query=${searchText}&page=1&include_adult=false`
      //update data
      this.updateMovieData(searchAPI);
      //get movie data
      const { titles, ids, poster_paths, release_dates, descriptions,
        popularitys, vote_counts, vote_avgs } = this.state;
      //iterate through movies
      return titles.map((title, i) => {
        //get movie year
        let movieDate = release_dates[i] || "";
        let movieYear = movieDate.substring(0, 4);
        //get movie path
        let moviePath = title.replace(/\s+/g, '-').toLowerCase();
        return (
          <div key={ids[i]}>
            <Link className={styles.resultLink} to={{
              pathname: `/movie/${moviePath}`,
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
            }}>
              <div className={styles.searchResults}>
                {title} ({movieYear})
              </div>
            </Link>
          </div>
        )
      })
    }
  }

  //handle page change to remove text in input
  componentDidMount() {
    this.setState({ pagePathname: this.props.location.pathname })
  }

  //handle clicking outside component - remove component
  handleClickOutside = () => {
    this.setState({ searchText: "" });
  }

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
    //if there is texts, make the results visible
    if (this.state.searchText) {
      this.setState({ isVisible: true })
    } else {
      this.setState({ isVisible: false })
    }
  }

  //page change
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      let newPathname = location.pathname;
      //if there is a different page - delete the search box text value
      if (this.state.pagePathname !== newPathname) {
        this.setState({ searchText: "" })
      }
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    let searchResultContainerStyle = this.state.searchText ?
      { backgroundColor: "rgb(0, 123, 255, 0.80)" } :
      { backgroundColor: "transparent" }

    return (
      <div className={styles.SearchContainer}>
        <input type="text" onChange={this.handleChange} placeholder="Search Movie"></input>
        <div className={styles.searchResultContainer} style={searchResultContainerStyle}>
          {this.searchResults()}
        </div>
      </div>

    )
  }

}



export default withRouter(onClickOutside(SearchBar));