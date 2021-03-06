import React, { useState } from "react";
import classNames from "classnames";
import { ChevronLeft, Save, Slash } from "react-feather";
import { useSelector } from "react-redux";
import { Avatar, Button, FormGroup, Input, TextField } from "components";
import {
  performAddBlockedUserRequest,
  performUpdateUserNoteRequest,
} from "common/requests";
import { RootState } from "store/stores";

interface IChatDescriptionProps {
  avatarUrl: string;
  isActive: boolean;
  onCloseClick: () => void;
  userLogin: string;
  userNote: string;
}

export const ChatDescription: React.FC<IChatDescriptionProps> = ({
  avatarUrl,
  isActive,
  onCloseClick,
  userLogin,
  userNote,
}) => {
  const userId = useSelector((state: RootState) => state.root.userId);
  const [newUserNote, setNewUserNote] = useState<string>("");

  return (
    <div
      className={classNames("chat-sidebar", {
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
            <Avatar large mx="5" mb="5" imagePath={avatarUrl} />
            <TextField type="h5" text={userLogin} />
            <TextField
              type="p"
              muted
              text={userNote === "NONE" ? "" : userNote}
            />
          </div>

          <div className="tab-content" role="tablist">
            {/*<!-- Details -->*/}
            <div className="tab-pane fade show active" role="tabpanel">
              <ul className="list-group list-group-flush mb-8">
                <li className="list-group-item py-6">
                  <FormGroup
                    visible
                    withLabel
                    forName="user-note"
                    label="User note"
                  >
                    <Input
                      name="user-note"
                      id="user-note"
                      placeholder="Input new user note"
                      type="textarea"
                      row="6"
                      value={newUserNote}
                      onChange={(note) => setNewUserNote(note)}
                    />
                  </FormGroup>
                </li>
                {/*<!-- Actions buttons -->*/}
                <li className="list-group-item py-6">
                  <div className="form-row">
                    <div className="col">
                      <Button
                        long
                        block
                        basic
                        flex
                        alignCenter
                        text="Save"
                        onClick={() => {
                          newUserNote !== "" &&
                            performUpdateUserNoteRequest(
                              userId,
                              userLogin,
                              newUserNote
                            );
                          setNewUserNote("");
                        }}
                      >
                        <Save className="ml-auto text-muted" size={15} />
                      </Button>
                    </div>
                    <div className="col">
                      <Button
                        long
                        block
                        basic
                        flex
                        alignCenter
                        text="Block user"
                        onClick={() =>
                          performAddBlockedUserRequest(userId, userLogin)
                        }
                      >
                        <Slash className="ml-auto text-muted" size={15} />
                      </Button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
