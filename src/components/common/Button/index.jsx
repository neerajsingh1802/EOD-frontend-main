import React from "react";
import styles from "./btn.module.scss";
import Spin from "components/common/Spin";
import { COLORS } from "helpers/utils/constant";

const Button = ({
  children,
  onClick,
  top,
  color,
  classes,
  height,
  width,
  bordered,
  gray,
  disabled,
  loading,
  hide,
}) => {
  const colors = {
    blue: COLORS.BLUE,
    orange: COLORS.ORANGE,
    green: COLORS.GREEN,
    red: COLORS.RED,
    gray: COLORS.GRAY,
    yellow: COLORS.YELLOW,
  };

  const btn_color = colors[color] || "#0F248F";

  if (!!hide) return null;
  return (
    <button
      data-testid="button"
      style={{
        marginTop: top,
        backgroundColor: bordered ? "transparent" : btn_color,
        height: !!height && height,
        width: !!width && width,
        border: !!bordered && `1.5px solid ${!gray ? btn_color : "#1B1D264D"}`,
        color: !!gray ? "gray" : !!bordered && btn_color,
        opacity: disabled && 0.5,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={`${styles.button} ${classes}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!!loading ? <Spin /> : children}
    </button>
  );
};

export default Button;
