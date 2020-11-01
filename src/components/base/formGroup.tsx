import React from "react";
import classNames from "classnames";

interface IFormGroupProps {
  forName?: string;
  label?: string;
  isVisible?: boolean;
  isWithLabel: boolean;
}

export const FormGroup: React.FC<IFormGroupProps> = ({
  forName,
  label,
  isVisible,
  isWithLabel,
  children
}) => {
  return (
    <div className="form-group">
      {isWithLabel && (
        <label
          className={classNames(
            { small: isVisible },
            { "sr-only": !isVisible }
          )}
          htmlFor={forName}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};
FormGroup.defaultProps = {
  isWithLabel: true
} as Partial<IFormGroupProps>;
