import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { selectSearchTerm } from "features/search/searchSlice";
import { Breakpoints } from "enums";

type SearchBarProps = {
  visible?: boolean;
};

const SearchBar = (props: SearchBarProps) => {
  const { visible = true } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery({ query: `(max-width: ${Breakpoints.Small}px)` });

  const stateSearchTerm = useSelector(selectSearchTerm);
  useEffect(() => {
    if (pathname.startsWith("/search")) {
      setSearchTerm(stateSearchTerm);
    } else {
      setSearchTerm("");
    }
  }, [stateSearchTerm, pathname]);

  const navigateToSearch = () => {
    if (searchTerm.length > 0) {
      navigate(`/search/${encodeURI(searchTerm)}`);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    navigateToSearch();
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      navigateToSearch();
    }
  };

  const inputProps = isSmallScreen ? {} : { borderRightRadius: 0 };

  return (
    <Box
      d="flex"
      marginLeft={2}
      marginRight={2}
      width="85%"
      maxWidth={500}
      visibility={visible ? "visible" : "hidden"}
    >
      <Input
        value={searchTerm}
        placeholder={t("search_placeholder")}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        size="md"
        {...inputProps}
      />
      {!isSmallScreen && (
        <IconButton
          onClick={handleSearchClick}
          aria-label={t("search")}
          size="md"
          icon={<SearchIcon />}
          borderLeftRadius={0}
          disabled={searchTerm.length === 0}
        />
      )}
    </Box>
  );
};

export default SearchBar;
