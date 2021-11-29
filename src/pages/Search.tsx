import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Text } from "@chakra-ui/react";

import { selectSearchTerm, updateSearchTerm } from "features/search/searchSlice";
import { useSearchQuery } from "services/giphy";
import GifImageGrid from "components/GifImageGrid";
import Loading from "components/Loading";

const Search = () => {
  const { searchTerm = "" } = useParams();
  const stateSearchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data, error, isLoading } = useSearchQuery(searchTerm);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    const lowerCaseStateSearchTerm = stateSearchTerm.trim().toLowerCase();
    if (lowerCaseSearchTerm !== lowerCaseStateSearchTerm) {
      dispatch(updateSearchTerm(searchTerm));
    }
  }, [dispatch, searchTerm, stateSearchTerm]);

  return (
    <>
      <Helmet>
        <title>
          {searchTerm || t("search")} - {process.env.REACT_APP_WEBSITE_NAME}
        </title>
      </Helmet>
      <main>
        {error && <Text fontSize="3xl">{t("error")}</Text>}
        {isLoading && <Loading />}
        {data && <GifImageGrid data={data} />}
      </main>
    </>
  );
};

export default Search;
