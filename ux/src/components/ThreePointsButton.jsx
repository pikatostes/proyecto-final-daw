import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  FlagFill,
  PencilSquare,
  PlusCircle,
  ThreeDotsVertical,
  Trash,
} from "react-bootstrap-icons";

const ThreePointsButton = ({
  target,
  onEdit,
  onDelete,
  onReport,
  onAddPieceDetail, // New prop for handling "Add Piece Detail"
  userSession,
}) => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <OverlayTrigger
      rootClose
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
            {(userSession === target.user ||
              (userData.roles && userData.roles.includes("ROLE_ADMIN"))) && (
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
                {target.colors && ( // Check if target has a price
                  <p>
                    <PlusCircle
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddPieceDetail(target); // Handle "Add Piece Detail"
                      }}
                      style={{ cursor: "pointer" }}
                    />{" "}
                    Add Piece Detail
                  </p>
                )}
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
