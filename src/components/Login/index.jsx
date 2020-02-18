import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginGuest from "./LoginGuest";
import styles from "./login.module.css";


export default class Login extends Component {
  render() {
    return (
      <main id="mainContent" >
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <header>
              <h1 className={styles.heading}>Login to the Movie Search App</h1>
            </header>
            <LoginForm />
            <div className={styles.noAccContainer}>
              <p className={styles.noAccText}>
                Don't have an account? You can register
                <Link className="nav-item active" to="registration"> here</Link>
              </p>
            </div>
            <div className={styles.noAccContainer} >
              <p className={styles.noAccText} >
                Don't feel like making an account? You can login as a guest
                <LoginGuest />
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

// user = "guest"
// email = "guest@guest.com"
// password = "guestpass" 