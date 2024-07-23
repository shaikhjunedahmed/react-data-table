import React from "react";
import { Delete } from "@mui/icons-material"; // Import Delete icon
import { IconButton } from "@mui/material"; // Import IconButton component
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import { deleteMembers } from "../api/deleteMember"; // Import API function to delete a member
import { labels } from "../../labels/labels"; // Import labels for text

// Component to delete a user
const DeleteUser = (props) => {
  const { _id, data, onUpdateSetData } = props; // Destructure props
  const {
    DELETED,
    DELETE_TITLE,
    DELETE_SUCCESS_SUBTITLE,
    DELETE_SUBTITLE,
    DELETE_CONFIRM_BTN_TEXT,
    API_ERROR,
  } = labels; // Destructure labels

  // Function to handle the deletion of a user
  const onDeleteUser = async () => {
    // Display a confirmation dialog
    Swal.fire({
      title: DELETE_TITLE,
      text: DELETE_SUBTITLE,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: DELETE_CONFIRM_BTN_TEXT,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMembers(`users/${_id}`); // Send delete request to API
          // Filter out the deleted user from the existing data
          const newRecords = [...data].filter((member) => member._id !== _id);
          onUpdateSetData(newRecords); // Update the state with new data
          // Show success alert
          Swal.fire({
            title: DELETED,
            text: DELETE_SUCCESS_SUBTITLE,
            icon: "success",
          });
        } catch (error) {
          // Show error alert
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: API_ERROR,
          });
        }
      }
    });
  };

  return (
    <>
      {/* IconButton to trigger the delete action */}
      <IconButton
        size="small"
        color="error"
        aria-label="delete"
        onClick={onDeleteUser}
      >
        <Delete /> {/* Delete icon */}
      </IconButton>
    </>
  );
};

export default DeleteUser;