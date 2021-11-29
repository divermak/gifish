import { useLocation } from "react-router";

import Navbar from "./Navbar";

const Header = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <header>
      <Navbar logo={!isHomePage} searchBar={!isHomePage} />
    </header>
  );
};

export default Header;
