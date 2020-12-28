import React from "react";
import { useDispatch } from "react-redux";
import { SidebarTab, FormGroup, Input } from "components";
import { setGroupChatName } from "store/actions";

export const SidebarSubtabGroupDetails: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const dispatch = useDispatch();
  return (
    <SidebarTab id="create-group-details" isActive={isActive} isOuter={false}>
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
