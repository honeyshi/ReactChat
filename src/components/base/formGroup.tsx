import React from "react";
import classNames from "classnames";

interface IFormGroupProps {
  forName?: string;
  label?: string;
  visible?: boolean;
  withLabel?: boolean;
}

export const FormGroup: React.FC<IFormGroupProps> = ({
  forName,
  label,
  visible,
  withLabel,
  children,
}) => {
  return (
    <div className="form-group">
      {withLabel && (
        <label
          className={classNames({ small: visible }, { "sr-only": !visible })}
          htmlFor={forName}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};
