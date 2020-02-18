import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import CONSTANTS from "../../constants";
import SearchBar from "./searchBar";
// import { withRouter } from 'react-router';


class NavBar extends Component {
  state = {
    isAuthenticated: false
  }

  // componentWillMount() {
  //   this.unlisten = this.props.history.listen((location, action) => {
  //     console.log("on route change", location.pathname);
  //   });
  // }
  // componentWillUnmount() {
  //   this.unlisten();
  // }

  componentDidMount() {
    this.setUserAuthentication();
  }

  setUserAuthentication = () => {
    fetch(CONSTANTS.ENDPOINT.DASHBOARD)
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response.json();
      })
      .then(result => {
        //set page authentication to user authentication
        this.setState({
          isAuthenticated: result.isAuthenticated
        })
      })
      .catch(err => console.error(err.message));
  }

  render() {
    return (
      <React.Fragment>
        <div id="navBar-Container" classname={styles.navbarContainer}>
          <div className={styles.skipLink}>
            <a href="#mainContent">Skip to Main Content</a>
          </div>
          <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
            <Link className="navbar-brand" to="/">
              Movie App
            </Link>
            <SearchBar />
            <div className="navbar-nav">
              <Link className="nav-item nav-link active" to="/">
                Home
            </Link>
              <Link className="nav-item nav-link active" to="/dashboard">
                Dashboard
            </Link>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}


export default NavBar;