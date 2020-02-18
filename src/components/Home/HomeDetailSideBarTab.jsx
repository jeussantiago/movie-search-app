import React from "react";
import classnames from "classnames";
import styles from "./homedetail.module.css";
// import imgGreyAvatar from "../../images/GreyAvatar.svg";

export default function MasterDetailSideBarTab({ selectPage, pageName, APIurl }) {
  return (
    <button
      onClick={() => selectPage(pageName, APIurl)}
      type="button"
      className={classnames(
        "list-group-item",
        "list-group-item-action",
        styles.sidebarText
      )}
    >
      {/* <img src={sampleOrder.imageSrc ? sampleOrder.imageSrc : imgGreyAvatar} alt="Default Grey Avatar" className="mr-3" /> */}
      {pageName}
    </button>
  );
}
