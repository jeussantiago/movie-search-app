import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegistrationForm from"./RegistrationForm";
import styles from "./registration.module.css";

export default class Registration extends Component {
  render() {
    return (
      <main id="mainContent" >
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <header>
              <h1 className={styles.heading}>Register for the Movie Search App</h1>
            </header>
            <RegistrationForm 
            />
            <div className={styles.noAccContainer}> 
              <p className={styles.noAccText}>
                Already have an account? You can login
                <Link className="nav-item active" to="login"> here</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
