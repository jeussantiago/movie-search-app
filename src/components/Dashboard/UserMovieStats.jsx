import React from "react";
import styles from "./dashboard.module.css";
import classnames from "classnames";

export default function UserMovieStats({ title, data, measureOfTime }) {
  return (
    <div className={classnames(styles.movieStatsContainer, "col", "text-center")}>
      <div class="col">
        <h1>{data} {measureOfTime}</h1>
        <p>{title}</p>
      </div>
    </div>
  )
}