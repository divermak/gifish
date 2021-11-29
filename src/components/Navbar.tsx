import { Flex } from "@chakra-ui/react";

import SearchBar from "./SearchBar";
import Gifish from "./Gifish";
import FavoritesButtton from "./FavoritesButton";

type NavbarProps = {
  logo: boolean;
  searchBar: boolean;
};

const Navbar = (props: NavbarProps) => {
  const { logo, searchBar } = props;

  return (
    <nav>
      <Flex justify="space-between" alignItems="center">
        {logo && <Gifish height="var(--chakra-sizes-10)" />}
        <SearchBar visible={searchBar} />
        <FavoritesButtton />
      </Flex>
    </nav>
  );
};

export default Navbar;
