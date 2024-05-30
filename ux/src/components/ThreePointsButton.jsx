import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  FlagFill,
  PencilSquare,
  ThreeDotsVertical,
  Trash,
} from "react-bootstrap-icons";

const ThreePointsButton = ({
  target,
  onEdit,
  onDelete,
  onReport,
  userSession,
}) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="left"
      overlay={
        <Popover id="popover-positioned-left">
          <Popover.Body>
            {userSession && (
              <p>
                <FlagFill
                  onClick={(e) => {
                    e.stopPropagation();
                    onReport(target);
                  }}
                />{" "}
                Report
              </p>
            )}
            {userSession === target.user && (
              <>
                <p>
                  <PencilSquare
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(target);
                    }}
                  />{" "}
                  Edit
                </p>
                <p>
                  <Trash
                    alt="Remove"
                    height={20}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(target.id);
                    }}
                  />{" "}
                  Delete
                </p>
              </>
            )}
          </Popover.Body>
        </Popover>
      }
    >
      <ThreeDotsVertical alt="Options" style={{ cursor: "pointer" }} />
    </OverlayTrigger>
  );
};

export default ThreePointsButton;
