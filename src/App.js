import { Box } from "@mui/material";
import Title from "./components/Title/Title";
import { labels } from "./labels/labels";
import Layout from "./components/Layout";

function App() {
  const { ALL_MEMBERS } = labels;

  return (
    <Box
      borderTop="2px solid grey"
      backgroundColor="aliceblue"
      height="calc(100vh - 18px)"
      sx={{ p: 1 }}
    >
      <Title title={ALL_MEMBERS} />
      <Layout />
    </Box>
  );
}

export default App;
