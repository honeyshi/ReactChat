import React, { useState } from "react";
import * as Icon from "react-feather";
import { SidebarTab } from "./sidebarTab";
import { SidebarTitle } from "./sidebarTitle";
import { SidebarItemsContainer } from "./sidebarItemsContainer";
import { Button, FileInput, FormGroup, Input, TextField } from "../base";
import {
  ISidebarChatItem,
  ISidebarFriendItem,
  ISidebarUserInfoItem,
  ISidebarUserProfileProps,
} from "../../common/interfaces";
import { NavbarItem } from "../navigation";
import { RootState } from "../../store/stores";
import { useSelector } from "react-redux";

import "./sidebar.scss";
import { performSearchUserRequest } from "../../common/requests";
import {
  checkInputFile,
  checkUserHasPrivateChats,
} from "../../common/functions";

const userProfileItem: ISidebarUserProfileProps = {
  userDescription:
    "Bootstrap is an open source toolkit for developing web with HTML.",
  userImage: "/fake-link",
  userName: "Matthew Wiggins",
};

const userProfileInfoItems: ISidebarUserInfoItem[] = [
  { itemHeader: "Country", itemValue: "Warsaw, Poland", icon: Icon.Globe },
  { itemHeader: "Phone", itemValue: "+39 02 87 21 43 19", icon: Icon.Phone },
  { itemHeader: "Email", itemValue: "anna@gmail.com", icon: Icon.Mail },
  { itemHeader: "Time", itemValue: "10:03 am", icon: Icon.Clock },
];

const Sidebar: React.FC = () => {
  const activeNavbar = useSelector(
    (state: RootState) => state.root.activeNavbar
  );
  const sidebarState = useSelector((state: RootState) => state.sidebar);
  const [searchLogin, setSearchLogin] = useState<string>();
  const [activeCreateGroupTab, setActiveCreateGroupTab] = useState<string>(
    "create-group-details"
  );
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
    <div className="sidebar">
      <div className="tab-content h-100" role="tablist">
        <SidebarTab
          id="tab-content-dialogs"
          isActive={activeNavbar.includes("tab-content-dialogs")}
          isOuter={true}
        >
          <SidebarTitle text="Chats" />
          {sidebarState.sidebarDialogs.length !== 0 ? (
            <SidebarItemsContainer
              classes="nav d-block list-discussions-js mb-n6"
              sidebarChatItems={sidebarState.sidebarDialogs}
            />
          ) : (
            <TextField
              isCenter={true}
              isBold={false}
              text="You do not have any chats. Search user to start messaging"
              type="p"
            />
          )}
        </SidebarTab>

        <SidebarTab
          id="tab-content-search-users"
          isActive={activeNavbar.includes("tab-content-search-users")}
          isOuter={true}
        >
          <SidebarTitle text="Search users" />
          <form className="mb-6">
            <div className="input-group">
              <Input
                type="input"
                placeholder="Type user's login..."
                value={searchLogin}
                onChange={(login) => setSearchLogin(login)}
              />
              <div className="input-group-append">
                <Button
                  isPrimary={false}
                  classes="btn-lg btn-ico btn-secondary btn-minimal"
                  onClick={() => {
                    performSearchUserRequest(searchLogin);
                    setSearchLogin("");
                  }}
                >
                  <Icon.Search size={15} />
                </Button>
              </div>
            </div>
          </form>
          {sidebarState.sidebarFoundUsers.length !== 0 ? (
            <SidebarItemsContainer
              classes="mb-n6"
              sidebarFriendItems={sidebarState.sidebarFoundUsers}
            />
          ) : (
            <TextField
              isCenter={true}
              isBold={false}
              text="Users not found"
              type="p"
            />
          )}
        </SidebarTab>

        <SidebarTab
          id="tab-content-blocked-users"
          isActive={activeNavbar.includes("tab-content-blocked-users")}
          isOuter={true}
        >
          <SidebarTitle text="Blocked users" />
          {sidebarState.sidebarBlockedUsers.length !== 0 ? (
            <SidebarItemsContainer
              classes="mb-n6"
              sidebarFriendItems={sidebarState.sidebarBlockedUsers}
            />
          ) : (
            <TextField
              isCenter={true}
              isBold={false}
              text="You do not have blocked users"
              type="p"
            />
          )}
        </SidebarTab>

        <SidebarTab
          id="tab-content-user"
          isActive={activeNavbar.includes("tab-content-user")}
          isOuter={true}
        >
          <SidebarTitle text="Profile" />
          <SidebarItemsContainer
            classes="card mb-6"
            sidebarUserInfo={userProfileItem}
          />
          <SidebarItemsContainer
            classes="card mb-6"
            sidebarUserInfoItems={userProfileInfoItems}
          />
          <div className="form-row">
            <div className="col">
              <Button
                isPrimary={false}
                classes="btn-lg btn-block btn-basic d-flex align-items-center"
                text="Reset password"
              >
                <Icon.Key className="ml-auto text-muted" size={15} />
              </Button>
            </div>
            <div className="col">
              <Button
                isPrimary={false}
                classes="btn-lg btn-block btn-basic d-flex align-items-center"
                text="Logout"
              >
                <Icon.LogOut className="ml-auto text-muted" size={15} />
              </Button>
            </div>
          </div>
        </SidebarTab>

        <SidebarTab
          id="tab-content-create-chat"
          isActive={activeNavbar.includes("tab-content-create-chat")}
          isOuter={true}
          outsideScroll={true}
          buttonClasses="btn-lg btn-block"
          buttonDisabled={
            !checkUserHasPrivateChats(sidebarState.sidebarDialogs)
          }
          buttonText="Create Group"
        >
          <SidebarTitle text="Create group" />
          <ul className="nav nav-tabs nav-justified mb-6" role="tablist">
            <NavbarItem
              isActive={activeCreateGroupTab?.includes("create-group-details")}
              isMenu={false}
              link="create-group-details"
              text="Details"
              onClick={() => setActiveCreateGroupTab("create-group-details")}
            />
            <NavbarItem
              isActive={activeCreateGroupTab?.includes("create-group-members")}
              isMenu={false}
              link="create-group-members"
              text="Members"
              onClick={() => setActiveCreateGroupTab("create-group-members")}
            />
          </ul>
          <div className="tab-content" role="tablist">
            <SidebarTab
              id="create-group-details"
              isActive={activeCreateGroupTab?.includes("create-group-details")}
              isOuter={false}
            >
              <FormGroup label="Photo" isVisible={true} isWithLabel={true}>
                <div className="position-relative text-center bg-secondary rounded p-6">
                  <div className="avatar bg-primary text-white mb-5">
                    <Icon.Image size={19} />
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
                  <label
                    className="stretched-label mb-0"
                    htmlFor="upload-chat-photo"
                  />
                </div>
              </FormGroup>
              <FormGroup
                forName="new-chat-title"
                label="Name"
                isVisible={true}
                isWithLabel={true}
              >
                <Input
                  name="new-chat-title"
                  id="new-chat-title"
                  placeholder="Group Name"
                  type="input"
                  onChange={() => void 0}
                />
              </FormGroup>
            </SidebarTab>
            <SidebarTab
              id="create-group-members"
              isActive={activeCreateGroupTab?.includes("create-group-members")}
              isOuter={false}
            >
              {checkUserHasPrivateChats(sidebarState.sidebarDialogs) ? (
                <SidebarItemsContainer
                  classes="list-group list-group-flush mb-n6"
                  sidebarGroupMembersItems={sidebarState.sidebarDialogs}
                />
              ) : (
                <TextField
                  isCenter={true}
                  isBold={false}
                  text="You do not have any private conversations with users. Search user to start messaging"
                  type="p"
                />
              )}
            </SidebarTab>
          </div>
        </SidebarTab>
      </div>
    </div>
  );
};

export default Sidebar;
