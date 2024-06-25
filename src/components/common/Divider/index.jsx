import React from "react";
import styles from "./divider.module.css";
import cx from "classnames";

const Divider = ({ text, classes }) => {
  return (
    <div data-testid="divider" className={cx(styles.divider, classes)}>
      <div></div>
      {!!text && <p>{text}</p>}
      <div></div>
    </div>
  );
};

export default Divider;
