import classNames from "classnames";
import React from "react";
import { Trash2 } from "react-feather";
import { performDeleteMessageRequest } from "common/requests";
import { propsToSpace, SpaceProps } from "common/utils/spaceUtil";

interface IDeleteMessageProps extends SpaceProps {
  messageId: string;
}

export const DeleteMessage: React.FC<IDeleteMessageProps> = ({
  messageId,
  children,
  ...other
}) => {
  const classes = classNames("text-muted", "opacity-60", propsToSpace(other));
  return (
    <>
      <a
        className={classes}
        onClick={() => performDeleteMessageRequest(messageId)}
      >
        <Trash2 size={15} strokeWidth={1} />
      </a>
    </>
  );
};
