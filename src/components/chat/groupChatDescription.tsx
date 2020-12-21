import classNames from "classnames";
import React, { useState } from "react";
import { ChevronLeft } from "react-feather";
import { Avatar, FileInput, TextField } from "../base";
import { NavbarItem } from "../navigation";
import { MembersListTab, AddMemberTab } from "../chat";
import { checkInputFile } from "../../common/functions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/stores";
import { performSetGroupChatImage } from "../../common/requests";

enum GroupDescriptionSubtabs {
  GroupMembers = "group-members",
  GroupAddMembers = "group-add-members",
}

interface IGroupChatDesciptionProps {
  imageUrl: string;
  isActive: boolean;
  onCloseClick: () => void;
  groupName: string;
  isAdmin: boolean;
}

export const GroupChatDescription: React.FC<IGroupChatDesciptionProps> = ({
  groupName,
  imageUrl,
  isActive,
  isAdmin,
  onCloseClick,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    GroupDescriptionSubtabs.GroupMembers
  );
  const chatId = useSelector((state: RootState) => state.chat.chatItem.chatId);
  const handleChange = (selectorFiles: FileList | null) => {
    if (
      selectorFiles !== null &&
      selectorFiles.length !== 0 &&
      checkInputFile(selectorFiles[0])
    )
      performSetGroupChatImage(selectorFiles[0], chatId, true);
  };
  return (
    <div
      className={classNames("chat-sidebar", "bg-white", {
        "chat-sidebar-visible": isActive,
      })}
    >
      <div className="d-flex h-100 flex-column">
        {/*<!-- Header -->*/}
        <div className="border-bottom py-4 py-lg-6">
          <div className="container-fluid">
            <ul className="nav justify-content-between align-items-center">
              {/*<!-- Close sidebar button -->*/}
              <li className="nav-item list-inline-item">
                <a className="nav-link text-muted px-0" onClick={onCloseClick}>
                  <ChevronLeft size={19} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/*<!-- Body -->*/}
        <div className="hide-scrollbar flex-fill">
          <div className="border-bottom text-center py-9 px-10">
            {/*<!-- Photo -->*/}
            <Avatar large mx="5" mb="5" imagePath={imageUrl} />
            <TextField type="h5" text={groupName} />
            {isAdmin && (
              <>
                <FileInput
                  id="upload-group-photo"
                  displayNone
                  onChange={(e) => handleChange(e)}
                />
                <label className="mb-0" htmlFor="upload-group-photo">
                  Click here to upload new image for group.
                </label>
              </>
            )}
          </div>

          {/*<!-- Tabs -->*/}
          {isAdmin ? (
            <>
              <ul
                className="nav nav-tabs nav-justified bg-light rounded-0"
                role="tablist"
              >
                <NavbarItem
                  isActive={activeTab?.includes(
                    GroupDescriptionSubtabs.GroupMembers
                  )}
                  isMenu={false}
                  link={GroupDescriptionSubtabs.GroupMembers}
                  text="Members"
                  onClick={() =>
                    setActiveTab(GroupDescriptionSubtabs.GroupMembers)
                  }
                />
                <NavbarItem
                  isActive={activeTab?.includes(
                    GroupDescriptionSubtabs.GroupAddMembers
                  )}
                  isMenu={false}
                  link={GroupDescriptionSubtabs.GroupAddMembers}
                  text="Add member"
                  onClick={() =>
                    setActiveTab(GroupDescriptionSubtabs.GroupAddMembers)
                  }
                />
              </ul>
              <div className="tab-content" role="tablist">
                <MembersListTab
                  isActive={activeTab?.includes(
                    GroupDescriptionSubtabs.GroupMembers
                  )}
                  isAdmin={isAdmin}
                />
                <AddMemberTab
                  isActive={activeTab?.includes(
                    GroupDescriptionSubtabs.GroupAddMembers
                  )}
                />
              </div>
            </>
          ) : (
            <div className="tab-content" role="tablist">
              <MembersListTab
                isActive={activeTab?.includes(
                  GroupDescriptionSubtabs.GroupMembers
                )}
                isAdmin={isAdmin}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
