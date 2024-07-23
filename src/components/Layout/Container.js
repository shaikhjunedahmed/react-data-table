import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Backdrop, Box, CircularProgress, Divider } from "@mui/material";
import useColumns from "../hooks/useColumns";
import Pagination from "./Pagination";
import TextInput from "../input/TextInput";
import AddUsers from "../actions/AddUsers";
import { fetchMembers } from "../api/fetchMembers";
import { customStyles } from "./customStyles";
import "./CustomTableStyles.css";

const Container = () => {
  // State to hold data fetched from API
  const [data, setData] = useState([]);
  
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // State for filter search text
  const [filterText, setFilterText] = useState("");
  const deferredSearchText = useDeferredValue(filterText);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [perPage, setPerPage] = useState(10); // Number of rows per page

  // Function to filter users based on the search text
  const filteredUsers = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(deferredSearchText.toLowerCase())
    );
  }, [deferredSearchText, data]);

  // Function to fetch the members list from the API
  const getMembersList = async () => {
    try {
      const { data } = await fetchMembers("users");
      setData(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the members list when the component is mounted
  useEffect(() => {
    getMembersList();
  }, []);

  // Handle change in filter text input
  const onChangeFilterText = (e) => {
    setFilterText(e.target.value);
  };

  // Handle change in the number of rows per page
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to the first page
  };

  // Update the data state with new data
  const onUpdateSetData = (newData) => {
    setData(newData);
  };

  // Get the columns configuration from a custom hook
  const { getColumns } = useColumns(data, onUpdateSetData);

  // If data is still loading, show a loading spinner
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  // Paginate the filtered data
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <Box sx={{ pt: 1 }}>
      {/* Search and add user actions */}
      <Box
        sx={{ px: 1, pb: 2 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Search input */}
        <Box width="25rem">
          <TextInput
            label="Filter data"
            placeholder="Search by name"
            value={filterText}
            onChange={onChangeFilterText}
          />
        </Box>
        {/* Add users component */}
        <Box>
          <AddUsers data={data} onUpdateSetData={onUpdateSetData} />
        </Box>
      </Box>
      <Divider />
      {/* Data table */}
      <Box className="custom-table" sx={{ px: 1, py: 2 }}>
        <DataTable
          columns={getColumns()}
          data={paginatedData}
          customStyles={customStyles}
          defaultSortAsc
          pagination
          paginationServer // Manually handle pagination
          paginationComponent={Pagination}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
          paginationComponentOptions={{
            customPagination: () => <Pagination currentPage={currentPage} />,
            data: {
              currentPage,
              totalRows: filteredUsers.length,
              rowsPerPage: perPage,
              setCurrentPage,
              setPerPage: (e) => handlePerPageChange(e.target.value),
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Container;