import React, { useCallback } from "react";

interface FileInputProps {
  classes?: string;
  id?: string;
  onChange: (value: FileList | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  classes,
  id,
  onChange,
}) => {
  const onchange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.files),
    [onChange]
  );
  return <input className={classes} id={id} type="file" onChange={onchange} />;
};
