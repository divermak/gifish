import { Box, Flex } from "@chakra-ui/react";

import Gifish from "components/Gifish";
import SearchBar from "components/SearchBar";

const Home = () => (
  <main>
    <Flex direction="column" alignItems="center" w="100%" h="100%" marginTop={16}>
      <Box mb={8}>
        <Gifish width="256px" text />
      </Box>
      <SearchBar />
    </Flex>
  </main>
);

export default Home;
