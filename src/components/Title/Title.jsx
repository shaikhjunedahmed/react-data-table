import React from "react";
import { Box, Typography } from "@mui/material";

const Title = (props) => {
  const { title } = props;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
    </Box>
  );
};

export default Title;
