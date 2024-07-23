import React, { useState } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import Dialog from "../Layout/Dialog";
import { labels } from "../../labels/labels";
import { postMembers } from "../api/postMembers";

const AddUsers = (props) => {
  const { ADD_NEW_MEMBERS, API_ERROR, SUCCESS, ADD_USER_SUCCESS } = labels;
  const { onUpdateSetData, data: existingRecords } = props;
  const [openDialog, setOpenDialog] = useState(false);

  // Close the dialog
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  // Open the dialog
  const onOpenDialog = () => {
    setOpenDialog(true);
  };

  // Handle form submission
  const onSubmit = async (formDetails, cb) => {
    try {
      const { data } = await postMembers("users", formDetails);
      // Create a new array with the new member added
      const newRecords = [...existingRecords];
      newRecords.push(data);
      // Update the state with the new records
      onUpdateSetData(newRecords);
      // Show success alert
      Swal.fire({
        title: SUCCESS,
        text: ADD_USER_SUCCESS,
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
      // Callback function to reset the form
      cb();
    }
  };

  return (
    <>
      {/* Button to open the dialog */}
      <Button
        size="small"
        variant="contained"
        color="success"
        sx={{ textTransform: "unset" }}
        onClick={onOpenDialog}
      >
        {ADD_NEW_MEMBERS}
      </Button>
      {/* Dialog for adding a new user */}
      <Dialog
        open={openDialog}
        handleClose={onCloseDialog}
        title={ADD_NEW_MEMBERS}
        onSubmit={onSubmit}
        defaultState={{
          name: "",
          email: "",
          age: "",
          parent_id: "",
        }}
      />
    </>
  );
};

export default AddUsers;