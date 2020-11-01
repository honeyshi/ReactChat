import React from "react";
import * as Icon from "react-feather";
import { SidebarTab } from "./sidebarTab";
import { SidebarTitle } from "./sidebarTitle";
import { SidebarItemsContainer } from "./sidebarItemsContainer";
import { Button } from "../base/button";
import { FormGroup } from "../base/formGroup";
import { Input } from "../base/input";
import {
  ISidebarChatItem,
  ISidebarFriendItem,
  ISidebarUserInfoItem,
  ISidebarUserProfileProps
} from "../../common/interfaces";
import { NavbarItem } from "../navigation/navbarItem";

const sidebarChatItems: ISidebarChatItem[] = [
  {
    chatHeader: "Bootstrap Themes",
    chatImage: "/fake-link",
    countUnreadMessages: 3,
    isOnline: false,
    lastMessageAuthor: "Anna Bridges",
    lastMessageText: "Hey, Maher! How are you? The weather is great isn't it?",
    lastMessageTime: "10:15 AM"
  },
  {
    chatHeader: "Anna Bridges",
    chatImage: "/fake-link-ann",
    countUnreadMessages: 0,
    isOnline: true,
    lastMessageText: "is typing...",
    lastMessageTime: "10:42 AM"
  }
];

const sidebarFriendItems: ISidebarFriendItem[] = [
  {
    friendImage: "/fake-link",
    friendName: "Anna Bridges",
    friendStatus: "Online",
    isOnline: true
  },
  {
    friendImage: "/fake-link",
    friendName: "Brian Dawson",
    friendStatus: "last seen 2 hours ago",
    isOnline: false
  },
  {
    friendImage: "/fake-link",
    friendName: "Leslie Sutton",
    friendStatus: "last seen 3 days ago",
    isOnline: false
  },
  {
    friendImage: "/fake-link",
    friendName: "Simon Haskell",
    friendStatus: "last seen 3 days ago",
    isOnline: false
  },
  {
    friendImage: "/fake-link",
    friendName: "Tina Turner",
    friendStatus: "last seen 3 days ago",
    isOnline: false
  }
];

const userProfileItem: ISidebarUserProfileProps = {
  userDescription:
    "Bootstrap is an open source toolkit for developing web with HTML.",
  userImage: "/fake-link",
  userName: "Matthew Wiggins"
};

const userProfileInfoItems: ISidebarUserInfoItem[] = [
  { itemHeader: "Country", itemValue: "Warsaw, Poland", icon: Icon.Globe },
  { itemHeader: "Phone", itemValue: "+39 02 87 21 43 19", icon: Icon.Phone },
  { itemHeader: "Email", itemValue: "anna@gmail.com", icon: Icon.Mail },
  { itemHeader: "Time", itemValue: "10:03 am", icon: Icon.Clock }
];

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="tab-content h-100" role="tablist">
        <SidebarTab id="tab-content-dialogs" isActive={false} isOuter={true}>
          <SidebarTitle text="Chats" />
          <SidebarItemsContainer
            classes="nav d-block list-discussions-js mb-n6"
            sidebarChatItems={sidebarChatItems}
          />
        </SidebarTab>

        <SidebarTab id="tab-content-friends" isActive={true} isOuter={true}>
          <SidebarTitle text="Friends" />
          <form className="mb-6">
            <div className="input-group">
              <Input
                type="input"
                placeholder="Search for messages or users..."
              />
              <div className="input-group-append">
                <Button
                  isPrimary={false}
                  classes="btn-lg btn-ico btn-secondary btn-minimal"
                >
                  <Icon.Search size={15} />
                </Button>
              </div>
            </div>
          </form>
          <SidebarItemsContainer
            classes="mb-n6"
            sidebarFriendItems={sidebarFriendItems}
          />
        </SidebarTab>

        <SidebarTab id="tab-content-user" isActive={false} isOuter={true}>
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
          isActive={false}
          isOuter={true}
        >
          <SidebarTitle text="Create group" />
          <ul className="nav nav-tabs nav-justified mb-6" role="tablist">
            <NavbarItem
              isActive={true}
              isMenu={false}
              link="create-group-details"
              text="Details"
            />
            <NavbarItem
              isActive={false}
              isMenu={false}
              link="create-group-members"
              text="Members"
            />
          </ul>
          <SidebarTab id="create-group-details" isActive={true} isOuter={false}>
            <FormGroup forName="new-chat-title" label="Name" isVisible={true}>
              <Input
                name="new-chat-title"
                id="new-chat-title"
                placeholder="Group Name"
                type="input"
              />
            </FormGroup>
            <FormGroup
              forName="new-chat-topic"
              label="Topic (optional)"
              isVisible={true}
            >
              <Input
                name="new-chat-topic"
                id="new-chat-topic"
                placeholder="Group Topic"
                type="input"
              />
            </FormGroup>
            <FormGroup
              forName="new-chat-description"
              label="Description"
              isVisible={true}
            >
              <Input
                name="new-chat-description"
                id="new-chat-description"
                placeholder="Group Description"
                type="textarea"
                row="6"
              />
            </FormGroup>
            <div className="pb-6">
              <div className="container-fluid">
                <Button
                  isPrimary={true}
                  classes="btn-lg btn-block"
                  text="Create Group"
                />
              </div>
            </div>
          </SidebarTab>
        </SidebarTab>
      </div>
    </div>
  );
};