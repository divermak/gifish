import { ReactElement, useState } from "react";
import { Box, Tooltip, Button, useToast } from "@chakra-ui/react";
import { useCopyToClipboard } from "usehooks-ts";
import { useDeviceSelectors } from "react-device-detect";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import FillHeartIcon from "../icons/FillHeartIcon";
import OutlineLinkIcon from "../icons/OutlineLinkIcon";

import { addToFavorites, removeFromFavorites } from "features/favorites/favoritesSlice";
import Gif from "types/Gif";
import styles from "./Overlay.module.css";

type OverlayProps = {
  gif: Gif;
  isFavorite: boolean;
};

const Overlay = (props: OverlayProps): ReactElement => {
  const { gif, isFavorite } = props;
  const { t } = useTranslation();
  const [, copyToClipboard] = useCopyToClipboard();
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const toast = useToast();

  const { isMobile } = selectors;
  const favoriteTooltipLabel = isFavorite ? t("remove_from_favorites") : t("add_to_favorites");
  const favoriteIconColor = isFavorite ? "red.500" : "gray.300";

  const handleCopyLinkClick = () => {
    copyToClipboard(gif.images.original.url);

    toast({
      title: t("link_copied"),
      status: "success",
      duration: 1000,
    });
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(gif.id));
    } else {
      dispatch(addToFavorites(gif));
    }
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <Box className={styles.overlay} opacity={isMobile || isActive ? 1 : 0}>
      <Box textAlign="end">
        <Tooltip label={t("copy_to_clipboard")} aria-label={t("copy_to_clipboard")}>
          <Button
            variant="link"
            w="24px"
            minW="24px"
            m="12px"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleCopyLinkClick}
            aria-label={t("copy_to_clipboard")}
          >
            <OutlineLinkIcon boxSize={6} color="gray.300" />
          </Button>
        </Tooltip>
        <Tooltip label={favoriteTooltipLabel} aria-label={favoriteTooltipLabel}>
          <Button
            variant="link"
            w="24px"
            minW="24px"
            m="12px"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleFavoriteClick}
            aria-label={favoriteTooltipLabel}
          >
            <FillHeartIcon boxSize={6} color={favoriteIconColor} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Overlay;
