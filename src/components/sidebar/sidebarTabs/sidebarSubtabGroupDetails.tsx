import React, { useState } from "react";
import { Image } from "react-feather";
import { SidebarTab } from "..";
import { checkInputFile } from "../../../common/functions";
import { FileInput, FormGroup, Input, TextField } from "../../base";

export const SidebarSubtabGroupDetails: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const handleChange = (selectorFiles: FileList | null) => {
    console.log(selectorFiles);
    if (
      selectorFiles !== null &&
      selectorFiles.length !== 0 &&
      checkInputFile(selectorFiles[0])
    )
      setUploadedFile(selectorFiles[0]);
  };
  return (
    <SidebarTab id="create-group-details" isActive={isActive} isOuter={false}>
      <FormGroup label="Photo" isVisible isWithLabel>
        <div className="position-relative text-center bg-secondary rounded p-6">
          <div className="avatar bg-primary text-white mb-5">
            <Image size={19} />
          </div>
          <TextField
            classes="small text-muted mb-0"
            text="You can upload jpg, jpeg or png files."
            type="p"
            isCenter={false}
            isBold={false}
          />
          <FileInput
            id="upload-chat-photo"
            classes="d-none"
            onChange={(e) => handleChange(e)}
          />
          <label className="stretched-label mb-0" htmlFor="upload-chat-photo" />
        </div>
      </FormGroup>
      <FormGroup forName="new-chat-title" label="Name" isVisible isWithLabel>
        <Input
          name="new-chat-title"
          id="new-chat-title"
          placeholder="Group Name"
          type="input"
          onChange={() => void 0}
        />
      </FormGroup>
    </SidebarTab>
  );
};