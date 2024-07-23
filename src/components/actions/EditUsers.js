import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import Dialog from "../Layout/Dialog";
import { labels } from "../../labels/labels";
import { patchMembers } from "../api/patchMember";

// Component to edit user details
const EditUsers = (props) => {
  const { EDIT_MEMBERS, API_ERROR, SUCCESS } = labels; // Destructure labels

  const { row, activeKey, data, onUpdateSetData } = props; // Destructure props
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility

  // Function to close the dialog
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to open the dialog
  const onOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle form submission
  const onSubmit = async (formDetails, cb) => {
    try {
      const updatedRecordId = formDetails._id; // Store the ID of the record being updated
      delete formDetails._id; // Remove the ID from the form details to avoid patching it
      await patchMembers(`users/${updatedRecordId}`, formDetails); // Send patch request to update member

      let existingRecords = [...data]; // Copy existing data

      // Find the index of the record being updated
      const updatedRecordIdx = existingRecords.findIndex(
        (record) => record._id === updatedRecordId
      );

      existingRecords[updatedRecordIdx] = formDetails; // Update the record with new details

      onUpdateSetData(existingRecords); // Update the state with new data

      // Show success alert
      Swal.fire({
        title: SUCCESS,
        text: `Member ${formDetails.name} (${formDetails.email}) updated successfully.`,
        icon: "success",
      });
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: API_ERROR,
      });
    } finally {
      cb(); // Callback to execute after form submission
    }
  };

  return (
    <>
      {/* Button to open the edit dialog */}
      <Button
        fullWidth
        size="small"
        onClick={onOpenDialog}
        sx={{
          p: 0,
          justifyContent: "flex-start",
          textTransform: "none",
          color: "#000",
          "&:hover": {
            backgroundColor: "#fafafa",
          },
        }}
      >
        <Typography variant="body2">{row[activeKey]}</Typography> {/* Display the active key value */}
      </Button>
      {/* Dialog component for editing user details */}
      <Dialog
        open={openDialog}
        handleClose={onCloseDialog}
        title={EDIT_MEMBERS}
        onSubmit={onSubmit}
        defaultState={row}
      />
    </>
  );
};

export default EditUsers;
