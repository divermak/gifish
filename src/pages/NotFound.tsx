import { useNavigate } from "react-router-dom";
import { Text, Image, Flex, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          {t("page_not_found")} - {process.env.REACT_APP_WEBSITE_NAME}
        </title>
      </Helmet>
      <main>
        <Flex direction="column" justify="center" alignItems="center" textAlign="center">
          <Image
            src={`${process.env.PUBLIC_URL}/images/404.gif`}
            alt={t("page_not_found")}
            margin={4}
            maxW="400px"
          />
          <Text fontSize="2xl">{t("page_not_found_text")}</Text>
          <Button mt={3} onClick={() => navigate("/")}>
            <Text>
              {t("go_home", { name: process.env.REACT_APP_WEBSITE_NAME })}
            </Text>
          </Button>
        </Flex>
      </main>
    </>
  );
};

export default NotFound;
