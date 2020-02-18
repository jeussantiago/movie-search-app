import React, { Component } from "react";
import styles from "./dashboard.module.css";
import classnames from "classnames";
import { ChevronLeft } from 'react-bootstrap-icons';
import { ChevronDown } from 'react-bootstrap-icons';

export default class UserListStats extends Component {
  state = {
    isListClicked: false,
    userMovies: []
  }


  //change status of drop down
  handleClick = () => this.setState({ isListClicked: !this.state.isListClicked })

  //change arrow based on dropw down
  dropDown = () => {
    if (this.state.isListClicked) {
      return <ChevronDown color="royalblue" size={35} />;
    } else {
      return <ChevronLeft color="royalblue" size={35} />;
    }
  }

  //user movies content when on dropdown
  dropDownContent = () => {
    if (this.state.isListClicked) {
      return (
        <div className={styles.contentContainer}>
          <div class="row">
            <div className={classnames(styles.NoContentBox, "col-3")}>No Content Yet</div>
          </div>
        </div>
      )
    }
  }


  render() {
    return (
      <div className={styles.listWrapper}>
        <div class="titleContainer">
          <h2>{this.props.title}</h2>
        </div>
        <button id="user-stats-container" onClick={this.handleClick} className={classnames(styles.lineButton, "col-12")}>
          <div class="row">
            <div className={styles.line}>
              <div className={styles.listLine}></div>
            </div>
            <div className={classnames(styles.arrow)}>
              {this.dropDown()}
            </div>
          </div>
        </button>
        {this.dropDownContent()}
      </div>
    )
  }
}