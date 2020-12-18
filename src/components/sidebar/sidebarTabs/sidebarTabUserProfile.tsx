import React from "react";
import { Mail, Hexagon, Key, LogOut } from "react-feather";
import { useSelector } from "react-redux";
import { SidebarItemsContainer, SidebarTab, SidebarTitle } from "..";
import {
  ISidebarUserInfoItem,
  ISidebarUserProfileProps,
} from "../../../common/interfaces";
import { RootState } from "../../../store/stores";
import { Button } from "../../base";

export const SidebarTabUserProfile: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const userInfo = useSelector((state: RootState) => state.root.userInfo);

  const userProfileItem: ISidebarUserProfileProps = {
    userDescription:
      "Click here to change your avatar image. You can upload jpg, jpeg or png files.",
    userImage: userInfo.userImage,
    userName: userInfo.userLogin,
  };

  const userProfileInfoItems: ISidebarUserInfoItem[] = [
    { itemHeader: "Login", itemValue: userInfo.userLogin, icon: Hexagon },
    { itemHeader: "Email", itemValue: userInfo.userEmail, icon: Mail },
  ];
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
            <Key className="ml-auto text-muted" size={15} />
          </Button>
        </div>
        <div className="col">
          <Button long block basic flex alignCenter text="Logout">
            <LogOut className="ml-auto text-muted" size={15} />
          </Button>
        </div>
      </div>
    </SidebarTab>
  );
};
