import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  CircularProgress,
  IconButton,
  Dialog as MUIDialog,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Close } from "@mui/icons-material";
import TextInput from "../input/TextInput";
import { labels } from "../../labels/labels";

export default function Dialog(props) {
  const { open, defaultState, handleClose, title, onSubmit } = props;
  const { MEMBER_NAME, MEMBER_EMAIL, MEMBER_AGE, MEMBER_PARENT_ID } = labels;

  // Initialize the form state with default values
  const initialState = useMemo(() => defaultState, [defaultState]);

  const [formDetails, setFormDetails] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, age, parent_id } = formDetails;

  // Handle input change
  const onChangeTextInput = (e) => {
    const { name, value, type } = e.target;
    setFormDetails((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  // Handle form submission
  const onSubmitForm = (event) => {
    event.preventDefault();
    setIsLoading(true);
    onSubmit(formDetails, onCloseDialog);
  };

  // Close the dialog and reset form state
  const onCloseDialog = () => {
    setFormDetails(initialState);
    handleClose();
    setIsLoading(false);
  };

  // Check if the submit button should be disabled
  const isSubmitBtnDisabled = Object.values(formDetails).some(
    (input) => !input
  );

  return (
    <React.Fragment>
      {/* Material-UI Dialog */}
      <MUIDialog
        open={open}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: onSubmitForm,
        }}
      >
        {/* Dialog Title */}
        <DialogTitle sx={{ m: 0, p: 0, px: 1, py: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{title}</Typography>
            <IconButton
              aria-label="close"
              size="small"
              onClick={onCloseDialog}
              color="error"
              sx={{
                p: 0,
              }}
              disabled={isLoading}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        {/* Dialog Content */}
        <DialogContent dividers>
          {/* Name Input */}
          <TextInput
            label={MEMBER_NAME}
            required
            disabled={isLoading}
            variant="outlined"
            onChange={onChangeTextInput}
            margin="dense"
            size="small"
            name="name"
            value={name}
          />
          {/* Email Input */}
          <TextInput
            label={MEMBER_EMAIL}
            required
            disabled={isLoading}
            variant="outlined"
            onChange={onChangeTextInput}
            margin="dense"
            size="small"
            name="email"
            value={email}
          />
          {/* Age Input */}
          <TextInput
            label={MEMBER_AGE}
            required
            disabled={isLoading}
            variant="outlined"
            onChange={onChangeTextInput}
            margin="dense"
            size="small"
            type="number"
            name="age"
            value={age}
          />
          {/* Parent ID Input */}
          <TextInput
            label={MEMBER_PARENT_ID}
            required
            disabled={isLoading}
            variant="outlined"
            onChange={onChangeTextInput}
            margin="dense"
            size="small"
            type="number"
            name="parent_id"
            value={parent_id}
          />
        </DialogContent>
        {/* Dialog Actions */}
        <DialogActions sx={{ margin: "auto" }}>
          <Button
            disabled={isSubmitBtnDisabled || isLoading}
            color="success"
            variant="contained"
            type="submit"
          >
            Submit
            {isLoading ? (
              <>
                &nbsp;
                <CircularProgress color="info" size={20} />
              </>
            ) : null}
          </Button>
        </DialogActions>
      </MUIDialog>
    </React.Fragment>
  );
}
