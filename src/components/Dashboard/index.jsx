import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CONSTANTS from "../../constants";
import styles from "./dashboard.module.css";
import classnames from "classnames";
import UserListStats from "./UserListStats";
import UserMovieStats from "./UserMovieStats";

export default class Dashboard extends Component {
	state = {
		user: "",
		email: "",
		isAuthenticated: true,
		num_movies_watched: 0,
		avg_rating_movies_watched: 0.0,
		avg_length_movies_watched: 0
	}
	// // get user info from api
	componentDidMount() {
		fetch(CONSTANTS.ENDPOINT.DASHBOARD)
			.then(response => {
				if (!response.ok) { throw Error(response.statusText); }
				return response.json();
			})
			.then(result => {
				this.setState({
					user: result.user,
					email: result.email,
					isAuthenticated: result.isAuthenticated
				})
			})
			.catch(err => {
				this.setState({
					isAuthenticated: false
				})
			});
	}
	//{this.renderRedirect()}

	render() {
		//check if the user is authenticated
		const isUserAuthenticated = window.sessionStorage.getItem("isUserAuthenticated");
		if (!isUserAuthenticated) {
			return <Redirect to='/login' />
		}

		const { num_movies_watched, avg_rating_movies_watched, avg_length_movies_watched } = this.state;

		return (
			<main id="DashboardContent">
				<div className={classnames(styles.pageContainer, "container")}>
					<div class="row">
						<div class="col-3 border-right border-primary">
							<h1 className={styles.userTitle}>{this.state.user}'s Dashboard</h1>
							<Link className={classnames(styles.logoutLink, "nav-item", "nav-link", "active")} to="logout">logout</Link>
						</div>
						<div class="col-9 pl-5">
							<div id="user-stats-container" class="row">
								<UserMovieStats
									title={"Number of Movies Watched"}
									data={num_movies_watched}
								/>
								<UserMovieStats
									title={"Avgerage Rating of Movies Watched"}
									data={avg_rating_movies_watched}
								/>
								<UserMovieStats
									title={"Average Length of Movies Watched"}
									data={avg_length_movies_watched}
									measureOfTime={'mins'}
								/>
							</div>
							<div id="user-list-container" className={styles.listContainer}>
								<UserListStats
									title={"Favorite Movies"}
								/>
								<UserListStats
									title={"Favorite Actors/Actresses"}
								/>
								<UserListStats
									title={"Movie Playlist"}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		)
	}
}