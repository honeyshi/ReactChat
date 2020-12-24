import React from "react";
import { useSelector } from "react-redux";
import { checkInputFile } from "common/functions";
import { ISidebarUserProfileProps } from "common/interfaces";
import { performSetUserImageRequest } from "common/requests";
import { RootState } from "store/stores";
import { Avatar, FileInput, TextField } from "components";

export const SidebarUserProfile: React.FC<ISidebarUserProfileProps> = ({
  userDescription,
  userImage,
  userName,
}) => {
  const userId = useSelector((state: RootState) => state.root.userId);
  const handleChange = (selectorFiles: FileList | null) => {
    if (
      selectorFiles !== null &&
      selectorFiles.length !== 0 &&
      checkInputFile(selectorFiles[0])
    )
      performSetUserImageRequest(selectorFiles[0], userId);
  };
  return (
    <div className="card-body">
      <div className="text-center py-6">
        <Avatar large mb="5" imagePath={userImage} />
        <TextField type="h5" text={userName} />
        <TextField type="p" text={userDescription} muted />
        <FileInput
          id="upload-user-photo"
          displayNone
          onChange={(e) => handleChange(e)}
        />
        <label className="stretched-label mb-0" htmlFor="upload-user-photo" />
      </div>
    </div>
  );
};
