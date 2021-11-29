import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { selectFavoritesIds } from "features/favorites/favoritesSlice";
import Gif from "types/Gif";
import GifImage from "./GifImage/GifImage";

type GifImageGridProps = {
  data: Gif[];
};

const GifImageGrid = (props: GifImageGridProps) => {
  const favoritesIds = useSelector(selectFavoritesIds) as Set<string>;
  const { data } = props;

  return (
    <Box
      w="100%"
      h="100%"
      marginTop={4}
      marginBottom={4}
      sx={{ columnCount: [1, 2, 3, 4], columnGap: "16px" }}
    >
      {data.map((gif) => (
        <GifImage gif={gif} key={gif.id} isFavorite={favoritesIds.has(gif.id)} />
      ))}
    </Box>
  );
};

export default GifImageGrid;
