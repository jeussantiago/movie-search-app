import React, { Component } from "react";
import CONSTANTS from "../../constants";
import styles from "./login.module.css";

export default class LoginGuest extends Component {
  state = {
    user: "guest",
    password: "guestpass"
  }

  render() {
    return (
      <div className={styles.guestFormContainer}>
        <form action={CONSTANTS.ENDPOINT.LOGIN} method="post">
          <div className={styles.submitContainerGuest}>
            <button type="submit" className="btn btn-primary">
              Guest Login
						</button>
          </div>
          <div className={styles.formGroupGuest}>
            <input
              id="guesUser"
              type="text"
              value={this.state.user}
              name="user"
              required />
          </div>
          <div className={styles.formGroupGuest}>
            <input
              id="guestPassword"
              type="password"
              value={this.state.password}
              name="password"
              required />
          </div>
        </form>
      </div>
    )
  }
}