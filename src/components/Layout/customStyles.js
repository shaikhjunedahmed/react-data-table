export const customStyles = {
  rows: {
    style: {
      minHeight: "32px", // override the row height
      "&:nth-of-type(even)": {
        backgroundColor: "#fafafa",
      },
    },
  },
  headRow: {
    style: {
      minHeight: "32px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: 16,
      fontWeight: "bold",
      borderLeft: "1px solid #e0e0e0",
      borderRight: "1px solid #e0e0e0",
    },
  },
  cells: {
    style: {
      paddingLeft: 16,
    },
  },
};
