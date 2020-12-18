import classNames from "classnames";
import React, { useCallback } from "react";

interface FileInputProps {
  classes?: string;
  displayNone?: boolean;
  id?: string;
  onChange: (value: FileList | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  classes,
  displayNone,
  id,
  onChange,
}) => {
  const onchange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.files),
    [onChange]
  );
  const inputClasses = classNames(classes, {
    "d-none": displayNone,
  });
  return (
    <input className={inputClasses} id={id} type="file" onChange={onchange} />
  );
};
