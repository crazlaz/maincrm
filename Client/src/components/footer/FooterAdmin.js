/* eslint-disable */
import React from "react";
import {
  Flex,
  Link,
  Text,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const textColor = useColorModeValue("blue.700", "white");
  const { toggleColorMode } = useColorMode();

  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems="center"
      justifyContent="space-between"
      px={{ base: "30px", md: "50px" }}
      py="30px"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Text
        color={textColor}
        textAlign="center"
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {new Date().getFullYear()}{" "}
        <Text as="span" fontWeight="500" ms="4px">
          <Link
            fontWeight="500"
            color={textColor}
            target="_blank"
            href="https://prolinkinfotech.com/"
          >
            Atlas.
          </Link>
          {" "}Need help or facing issues? Reach us at{" "}
          <Link
            href="mailto:alternatecrm@gmail.com"
            fontWeight="500"
            color={textColor}
            target="_blank"
          >
            alternatecrm@gmail.com
          </Link>
        </Text>
      </Text>

      <HStack spacing="20px">
        <IconButton
          as={Link}
          href="#"
          aria-label="Facebook"
          icon={<FaFacebook />}
          variant="ghost"
          color={textColor}
          _hover={{ color: "blue.500" }}
        />
        <IconButton
          as={Link}
          href="#"
          aria-label="Twitter"
          icon={<FaTwitter />}
          variant="ghost"
          color={textColor}
          _hover={{ color: "blue.400" }}
        />
        <IconButton
          as={Link}
          href="#"
          aria-label="LinkedIn"
          icon={<FaLinkedin />}
          variant="ghost"
          color={textColor}
          _hover={{ color: "blue.600" }}
        />
        <IconButton
          as={Link}
          href="#"
          aria-label="Instagram"
          icon={<FaInstagram />}
          variant="ghost"
          color={textColor}
          _hover={{ color: "pink.400" }}
        />
      </HStack>

      <Button
        size="sm"
        mt={{ base: "20px", xl: "0px" }}
        onClick={toggleColorMode}
      >
        Toggle {useColorModeValue("Dark", "Light")} Mode
      </Button>
    </Flex>
  );
}