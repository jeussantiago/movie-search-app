import React, { Component } from "react";
import { Redirect } from "react-router-dom"; 
import CONSTANTS from "../../constants";

export default class Logout extends Component {
  state = {
    user: "logout test person",
    redirect: false
  }
  //redirect user if redirect state is true
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
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
          user: result.user
        })
      })
      .then(() => {
        //logout call to logout user - change authentication to false
        fetch(CONSTANTS.ENDPOINT.LOGOUT,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ user: this.state.user })
        })
      })
      .then(() => {
        //set sessionStorage to false/ remove key
        window.sessionStorage.removeItem("isUserAuthenticated");
      })
      .then(() => {
        //set redirect to true to redirect user
        this.setState({
          redirect: true
        })
        
      })
      .catch(err => console.error(err));


    return (
      <main id="LogoutContent">
        {this.renderRedirect()}
      </main>
    )
  }
}