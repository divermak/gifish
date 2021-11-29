import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { selectFavorites } from "features/favorites/favoritesSlice";
import Gif from "types/Gif";
import GifImageGrid from "components/GifImageGrid";

const Favorites = () => {
  const favorites = useSelector(selectFavorites) as Gif[];
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t("favorites")} - {process.env.REACT_APP_WEBSITE_NAME}
        </title>
      </Helmet>
      <main>
        <GifImageGrid data={favorites} />
      </main>
    </>
  );
};

export default Favorites;
