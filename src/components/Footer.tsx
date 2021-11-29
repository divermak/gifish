import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  const projectStartYear = 2021;
  const currentYear = new Date().getFullYear();
  const years =
    projectStartYear !== currentYear ? `${projectStartYear}-${currentYear}` : projectStartYear;

  return (
    <footer>
      <Flex justify="center">
        <Text fontSize="md">
          Copyright © {years}&nbsp;
          <Link isExternal href="https://www.linkedin.com/in/artem-ermakov/">
            Artem Ermakov
          </Link>
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;
