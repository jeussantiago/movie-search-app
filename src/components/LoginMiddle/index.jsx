import React, { Component } from "react";
import { Redirect } from "react-router-dom"; 
import CONSTANTS from "../../constants";

//user verification component
export default class LoginMiddle extends Component {
  state = {
    user: "",
    authenticated: false
  }
  //redirect user if redirect state is true
  renderRedirect = () => {
    if (this.state.user) {
      return <Redirect to='/dashboard' />
    } 
    return <Redirect to='/login' />
  }

  //{this.renderRedirect()}

  render() {
    //get current user
    fetch(CONSTANTS.ENDPOINT.DASHBOARD)
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response.json();
      })
      //set state of user
			.then(result => {
        this.setState({
          user: result.user,
          authenticated: result.isAuthenticated
        })
      })
      .catch(err => console.error(err));

      //check if a user exist
      if (this.state.user) {
        //set the session storage of the user
        window.sessionStorage.setItem("isUserAuthenticated", true);
        return <Redirect to='/dashboard' />
      } 

    return (
      <main id="LoginMiddleContent">
      </main>
    )
  }
}