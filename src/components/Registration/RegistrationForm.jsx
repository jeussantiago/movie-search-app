import React, { Component } from "react";
import styles from "./registration.module.css";
import CONSTANTS from "../../constants";

export default class RegistrationForm extends Component {
  state = {
    user: "",
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
	}

  render() {
    return (
			<div className={styles.formContainer}>
				<form action={CONSTANTS.ENDPOINT.REGISTRATION} method="post">
					<div className={styles.formGroup}>
						<label id='user-label' for='user'>Username</label>
						<input
						id="user"
						type="text"
						onChange={this.handleChange}
						value={this.state.user}
						name="user"
						className="form-control"
						placeholder="Add username here..."
						aria-label="Add username here..."
						required />
					</div>
					<div className={styles.formGroup}>
						<label id='email-label' for='email'>Email</label>
						<input
						id="email"
						type="email"
						onChange={this.handleChange}
						value={this.state.email}
						name="email"
						className="form-control"
						placeholder="Add email here..."
						aria-label="Add email here..."
						required />
					</div>
					<div className={styles.formGroup}>
						<label id='password-label' for='password'>Password</label>
						<input
						id="password"
						type="password"
						onChange={this.handleChange}
						value={this.state.password}
						name="password"
						className="form-control"
						placeholder="Add password here..."
						aria-label="Add password here..."
						required />
					</div>
					<div className={styles.submitContainer}>
						<button type="submit" className="btn btn-primary">
						Register
						</button>
					</div>
				</form>
			</div>
    );
  }
}
