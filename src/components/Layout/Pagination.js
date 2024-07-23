import React from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

const Pagination = (props) => {
  // Destructure pagination options and data from props
  const { paginationRowsPerPageOptions, paginationComponentOptions } = props;
  const {
    data: { rowsPerPage, setPerPage, setCurrentPage, totalRows, currentPage },
  } = paginationComponentOptions;

  // Calculate total number of pages
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Handler for clicking the "Previous" button
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler for clicking the "Next" button
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler for clicking the "First" button
  const onClickFirstPage = () => {
    setCurrentPage(1);
  };

  // Handler for clicking the "Last" button
  const onClickLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <Box
      marginTop={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Rows per page selector */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="subtitle2">Show</Typography>
        <select onChange={setPerPage} value={rowsPerPage}>
          {paginationRowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Typography variant="subtitle2">entries</Typography>
      </Box>
      
      {/* Pagination controls */}
      <Box display="flex" alignItems="center">
        <ButtonGroup
          size="small"
          variant="outlined"
          aria-label="Previous Pagination Action"
          color="success"
        >
          {/* "First" button */}
          <Button
            sx={{
              borderRadius: "0px !important",
              textTransform: "none",
            }}
            onClick={onClickFirstPage}
            disabled={currentPage === 1}
          >
            First
          </Button>
          {/* "Previous" button */}
          <Button
            sx={{
              borderRadius: "0px !important",
              textTransform: "none",
            }}
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
        </ButtonGroup>
        {/* Current page display */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ px: 1, background: "#2e7d32", height: 30 }}
        >
          <Typography color="#fff">{currentPage}</Typography>
        </Box>
        <ButtonGroup
          size="small"
          variant="outlined"
          aria-label="Next Pagination Action"
          color="success"
        >
          {/* "Next" button */}
          <Button
            sx={{
              borderRadius: "0px !important",
              textTransform: "none",
            }}
            disabled={currentPage === totalPages}
            onClick={handleNextClick}
          >
            Next
          </Button>
          {/* "Last" button */}
          <Button
            sx={{
              borderRadius: "0px !important",
              textTransform: "none",
            }}
            onClick={onClickLastPage}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Pagination;