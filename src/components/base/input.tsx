import React, { useCallback } from "react";
import classNames from "classnames";
import "./input.scss";

interface InputProps {
  classes?: string;
  name?: string;
  id?: string;
  isInvalid?: boolean;
  placeholder: string;
  row?: string;
  type: React.ElementType;
  value?: string;
  inputType?: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  classes,
  name,
  id,
  isInvalid,
  placeholder,
  row,
  type: Tag,
  value,
  inputType,
  onChange,
}) => {
  const onchange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );
  return (
    <Tag
      className={classNames(
        "form-control form-control-lg",
        { "is-invalid": isInvalid },
        classes
      )}
      name={name}
      id={id}
      placeholder={placeholder}
      rows={row}
      type={inputType}
      onChange={onchange}
      value={value}
    />
  );
};
