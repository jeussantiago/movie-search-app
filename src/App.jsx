import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";

// import Master_Detail from "./components/Master_Detail";

import Registration from "./components/Registration";

import Login from "./components/Login";

import LoginMiddle from "./components/LoginMiddle";

import Dashboard from "./components/Dashboard";

import Logout from "./components/Logout";

import Home from "./components/Home";

import MoviePage from "./components/MoviePage";

// import List from "./components/List";

// import Grid from "./components/Grid";

//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          {/* <Route exact path="/" component={Master_Detail} /> */}
          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/loginmiddle" component={LoginMiddle} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Route path="/movie/:title" component={MoviePage} />
          {/* <Route path="/List" component={List} /> */}
          {/* <Route path="/Grid" component={Grid} /> */}
        </Switch>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default App;
