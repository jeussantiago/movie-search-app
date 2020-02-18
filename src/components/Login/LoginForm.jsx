import React, { Component } from "react";
import CONSTANTS from "../../constants";
import styles from "./login.module.css";
// const axios = require('axios');

export default class LoginForm extends Component {
	state = {
    user: "",
    password: ""
	}
	
	handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<div className={styles.formContainer}>
				<form action={CONSTANTS.ENDPOINT.LOGIN} method="post">
					<div className={styles.formGroup}>
						<label id='user-label' for='user'>Username</label>
						<input
						id="user"
						type="text"
						onChange={this.handleChange}
						value={this.state.user}
						name="user"
						className="form-control"
						placeholder="Enter username here..."
						aria-label="Enter username here..."
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
						placeholder="Enter password here..."
						aria-label="Enter password here..."
						required />
					</div>
					<div className={styles.submitContainer}>
						<button type="submit" className="btn btn-primary">
						Login
						</button>
					</div>
				</form>
			</div>
		)
	}
}