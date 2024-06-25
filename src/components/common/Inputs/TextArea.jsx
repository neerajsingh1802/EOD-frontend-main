import React from "react";
import "./input.scss";

const TextBox = ({
  name,
  value,
  placeholder,
  onChange,
  top,
  error,
  height,
  width,
  title,
  classes,
  required,
  icon,
}) => {
  return (
    <div data-testid="textbox" style={{ marginTop: top }} className={classes}>
      {!!title && (
        <p>
          {title}
          {!!required && <span>*</span>}
        </p>
      )}
      <textarea
        style={{ height: !!height && height, width: !!width && width }}
        className={`textarea ${!!error && "error"}`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && <p className="error-text">{error}</p>}
      <span>{!!icon && icon}</span>
    </div>
  );
};

export default TextBox;
