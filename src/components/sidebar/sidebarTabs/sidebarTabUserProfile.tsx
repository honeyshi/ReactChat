import React from "react";
import { Mail, Hexagon, Key, LogOut } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  SidebarItemsContainer,
  SidebarTab,
  SidebarTitle,
  Button,
} from "components";
import {
  ISidebarUserInfoItem,
  ISidebarUserProfileProps,
} from "common/interfaces";
import { RootState } from "store/stores";
import { history } from "core/history";
import { setIsAuth, setUserId } from "store/actions";
import { updateStoreToInitialState } from "common/functions/storeFunctions";

export const SidebarTabUserProfile: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const userInfo = useSelector((state: RootState) => state.root.userInfo);
  const dispatch = useDispatch();

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
          <Button
            long
            block
            basic
            flex
            alignCenter
            text="Reset password"
            onClick={() => history.push("/send-reset-link")}
          >
            <Key className="ml-auto text-muted" size={15} />
          </Button>
        </div>
        <div className="col">
          <Button
            long
            block
            basic
            flex
            alignCenter
            text="Logout"
            onClick={() => {
              updateStoreToInitialState();
              history.push("/signin");
            }}
          >
            <LogOut className="ml-auto text-muted" size={15} />
          </Button>
        </div>
      </div>
    </SidebarTab>
  );
};
