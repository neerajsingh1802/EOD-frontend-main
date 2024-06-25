import React from "react";
import styles from "./progress.module.scss";
import cx from "classnames";

const LineProgress = ({ length, curr, classes, rounded, numbered }) => {
  return (
    <div data-testid="line-progress" className={styles.lineProgress}>
      {Array(length)
        .fill(1)
        .map((d, i) => (
          <div className={cx(styles.lineProgress__step, classes)}>
            <span
              className={cx(
                styles.lineProgress__dot,
                { [styles.filled]: i <= curr },
                { [styles.rounded]: rounded },
                { [styles.numbered]: numbered }
              )}
            >
              {numbered ? i + 1 : null}
            </span>
            <span
              className={cx(
                styles.lineProgress__line,
                { [styles.hidden]: i == length - 1 },
                { [styles.filled]: i <= curr - 1 }
              )}
            ></span>
          </div>
        ))}
    </div>
  );
};

export default LineProgress;
