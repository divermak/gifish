import { Flex, Text, Button, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import FillHeartIcon from "./icons/FillHeartIcon";
import { selectFavoritesIds } from "features/favorites/favoritesSlice";
import { Breakpoints } from "enums";

const FavoritesButtton = () => {
  const { t } = useTranslation();
  const favoritesIds = useSelector(selectFavoritesIds);
  const favoriteIconColor = favoritesIds.size > 0 ? "red.500" : "gray.300";
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: `(max-width: ${Breakpoints.Small}px)` });

  return (
    <Tooltip label={t("favorites")} aria-label={t("favorites")}>
      <Button onClick={() => navigate("/favorites")}>
        <Flex alignItems="center">
          <FillHeartIcon
            boxSize={6}
            color={favoriteIconColor}
            marginRight={isSmallScreen ? 0 : 2}
          />
          {!isSmallScreen && <Text>{t("favorites")}</Text>}
        </Flex>
      </Button>
    </Tooltip>
  );
};

export default FavoritesButtton;
