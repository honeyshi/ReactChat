import React from "react";
import { Image } from "react-feather";
import { useDispatch } from "react-redux";
import { SidebarTab } from "..";
import { checkInputFile } from "../../../common/functions";
import { setGroupChatImage, setGroupChatName } from "../../../store/actions";
import { FileInput, FormGroup, Input, TextField } from "../../base";

export const SidebarSubtabGroupDetails: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const dispatch = useDispatch();
  const handleChange = (selectorFiles: FileList | null) => {
    if (
      selectorFiles !== null &&
      selectorFiles.length !== 0 &&
      checkInputFile(selectorFiles[0])
    )
      dispatch(setGroupChatImage(selectorFiles[0]));
  };
  return (
    <SidebarTab id="create-group-details" isActive={isActive} isOuter={false}>
      <FormGroup label="Photo" visible withLabel>
        <div className="position-relative text-center bg-secondary rounded p-6">
          <div className="avatar bg-primary text-white mb-5">
            <Image size={19} />
          </div>
          <TextField
            small
            muted
            mb="0"
            text="You can upload jpg, jpeg or png files."
            type="p"
          />
          <FileInput
            id="upload-chat-photo"
            classes="d-none"
            onChange={(e) => handleChange(e)}
          />
          <label className="stretched-label mb-0" htmlFor="upload-chat-photo" />
        </div>
      </FormGroup>
      <FormGroup forName="new-chat-title" label="Name" visible withLabel>
        <Input
          name="new-chat-title"
          id="new-chat-title"
          placeholder="Group Name"
          type="input"
          onChange={(groupName) => dispatch(setGroupChatName(groupName))}
        />
      </FormGroup>
    </SidebarTab>
  );
};
