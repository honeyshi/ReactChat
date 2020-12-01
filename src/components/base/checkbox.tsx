import React, { useCallback } from "react";

import "./checkbox.scss";

interface ICheckboxProps {
  name: string | undefined;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const CheckBox: React.FC<ICheckboxProps> = ({
  name,
  value,
  onChange,
  disabled,
}) => {
  const onchange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked),
    [onChange]
  );
  return (
    <div className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        type="checkbox"
        id={name}
        defaultChecked={value}
        onChange={onchange}
        disabled={disabled}
      />
      <label className="custom-control-label" htmlFor={name} />
    </div>
  );
};
