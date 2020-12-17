import React from "react";
import * as Icon from "react-feather";
import { SidebarItemsContainer, SidebarTab, SidebarTitle } from "..";
import {
  ISidebarUserInfoItem,
  ISidebarUserProfileProps,
} from "../../../common/interfaces";
import { Button } from "../../base";

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

export const SidebarTabUserProfile: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  return (
    <SidebarTab id="tab-content-user" isActive={isActive} isOuter>
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
          <Button long block basic flex alignCenter text="Reset password">
            <Icon.Key className="ml-auto text-muted" size={15} />
          </Button>
        </div>
        <div className="col">
          <Button long block basic flex alignCenter text="Logout">
            <Icon.LogOut className="ml-auto text-muted" size={15} />
          </Button>
        </div>
      </div>
    </SidebarTab>
  );
};
