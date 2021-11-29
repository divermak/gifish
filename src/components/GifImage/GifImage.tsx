import { ReactElement } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useElementSize } from "usehooks-ts";

import Gif from "types/Gif";
import Overlay from "./Overlay";

type GifImageProps = {
  gif: Gif;
  isFavorite: boolean;
};

const GifImage = (props: GifImageProps): ReactElement => {
  const { gif, isFavorite } = props;
  const {
    id,
    title,
    images: {
      original: { webp, url, width: gifWidth, height: gifHeight },
    },
  } = gif;
  const [containerRef, { width: boxWidth }] = useElementSize();

  const ratio = gifWidth / gifHeight;
  const width = boxWidth;
  const height = Math.floor(width / ratio);

  return (
    <Box key={id} mb={2} ref={containerRef} position="relative">
      <Overlay gif={gif} isFavorite={isFavorite} />
      <picture>
        <source srcSet={webp} type="image/webp" width={width} height={height} />
        <Image
          w="100%"
          borderRadius="md"
          display="inline-block"
          src={url}
          alt={title}
          title={title}
          width={width}
          height={height}
          loading="lazy"
        />
      </picture>
    </Box>
  );
};

export default GifImage;
