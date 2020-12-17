import React, { useState } from "react";
import { Search } from "react-feather";
import { useSelector } from "react-redux";
import { SidebarItemsContainer, SidebarTab, SidebarTitle } from "..";
import { Button, Input, TextField } from "../../base";
import { performSearchUserRequest } from "../../../common/requests";
import { RootState } from "../../../store/stores";

export const SidebarTabSearch: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const sidebarFoundUsers = useSelector(
    (state: RootState) => state.sidebar.sidebarFoundUsers
  );
  const [searchLogin, setSearchLogin] = useState<string>("");
  return (
    <SidebarTab id="tab-content-search-users" isActive={isActive} isOuter>
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
              primary
              long
              icon
              secondary
              minimal
              onClick={() => {
                performSearchUserRequest(searchLogin);
                setSearchLogin("");
              }}
            >
              <Search size={15} />
            </Button>
          </div>
        </div>
      </form>
      {sidebarFoundUsers.length !== 0 ? (
        <SidebarItemsContainer
          classes="mb-n6"
          sidebarFriendItems={sidebarFoundUsers}
        />
      ) : (
        <TextField isCenter isBold={false} text="Users not found" type="p" />
      )}
    </SidebarTab>
  );
};
