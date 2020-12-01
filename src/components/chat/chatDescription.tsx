import React from "react";
import classNames from "classnames";
import { ChevronLeft, Save, Slash } from "react-feather";
import { Button, FormGroup, Input, TextField } from "../base";

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
            <div className="avatar avatar-xl mx-5 mb-5">
              <img className="avatar-img" src={avatarUrl} alt="" />
            </div>
            <h5>{userLogin}</h5>
            <TextField
              classes="text-muted"
              type="p"
              isBold={false}
              isCenter={false}
              text={userNote}
            />
          </div>

          <div className="tab-content" role="tablist">
            {/*<!-- Details -->*/}
            <div className="tab-pane fade show active" role="tabpanel">
              <ul className="list-group list-group-flush mb-8">
                <li className="list-group-item py-6">
                  <FormGroup
                    forName="user-note"
                    label="User note"
                    isVisible={true}
                    isWithLabel={true}
                  >
                    <Input
                      name="user-note"
                      id="user-note"
                      placeholder="Input new user note"
                      type="textarea"
                      row="6"
                      onChange={() => void 0}
                    />
                  </FormGroup>
                </li>
                {/*<!-- Actions buttons -->*/}
                <li className="list-group-item py-6">
                  <div className="form-row">
                    <div className="col">
                      <Button
                        isPrimary={false}
                        classes="btn-lg btn-block btn-basic d-flex align-items-center"
                        text="Save"
                      >
                        <Save className="ml-auto text-muted" size={15} />
                      </Button>
                    </div>
                    <div className="col">
                      <Button
                        isPrimary={false}
                        classes="btn-lg btn-block btn-basic d-flex align-items-center"
                        text="Block user"
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
