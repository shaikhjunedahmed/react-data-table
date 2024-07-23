import React from "react";
import { Typography } from "@mui/material";
import { labels } from "../../labels/labels";
import EditUsers from "../actions/EditUsers";
import DeleteUser from "../actions/DeleteUser";

// Custom hook to generate columns for a data table
const useColumns = (data, onUpdateSetData) => {
  // Destructure label names from the labels object
  const { ID, MEMBER_EMAIL, MEMBER_NAME, AGE, ACTION } = labels;

  // Function to get column definitions
  const getColumns = () => [
    {
      name: ID,
      selector: (row) => row.parent_id,
      sortable: true,
      minWidth: "80px",
      maxWidth: "80px",
      // Render cell content
      cell: (row) => <Typography variant="body2">{row.parent_id}</Typography>,
    },
    {
      name: MEMBER_NAME,
      selector: (row) => row.name,
      sortable: true,
      minWidth: "100px",
      maxWidth: "100%",
      // Render cell content with EditUsers component
      cell: (row) => (
        <EditUsers
          row={row}
          activeKey="name"
          data={data}
          onUpdateSetData={onUpdateSetData}
        />
      ),
    },
    {
      name: MEMBER_EMAIL,
      selector: (row) => row.email,
      sortable: true,
      minWidth: "350px",
      maxWidth: "100%",
      // Render cell content with EditUsers component
      cell: (row) => (
        <EditUsers
          row={row}
          activeKey="email"
          data={data}
          onUpdateSetData={onUpdateSetData}
        />
      ),
    },
    {
      name: AGE,
      selector: (row) => row.age,
      sortable: true,
      minWidth: "100px",
      maxWidth: "100px",
      // Render cell content
      cell: (row) => <Typography variant="body2">{row.age}</Typography>,
    },
    {
      name: ACTION,
      selector: (row) => row.parent_id,
      // Render cell content with DeleteUser component
      cell: (row) => (
        <DeleteUser
          _id={row._id}
          data={data}
          onUpdateSetData={onUpdateSetData}
        />
      ),
      sortable: false,
      minWidth: "100px",
      maxWidth: "100px",
    },
  ];

  // Return the getColumns function
  return { getColumns };
};

export default useColumns;
