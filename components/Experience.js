import React, { useState } from "react";
import {
  Text,
  Heading,
  GridItem,
  Image,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Grid } from "./Grid";
import { motion } from "framer-motion";

export const Experience = ({
  side,
  title,
  desc,
  stack,
  image,
  href,
  toggleable,
  ...props
}) => {
  // Local state to track the toggle status.
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle function for showing/hiding description.
  const toggleDescription = (e) => {
    if (toggleable && desc) {
      e.preventDefault();
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <Grid fluid templateColumns="repeat(4, 1fr)" mb={10} {...props}>
      <GridItem colSpan={{ base: 4, sm: 1 }}>
        <Text color="white" opacity={0.5}>
          {side}
        </Text>
      </GridItem>
      <GridItem colSpan={{ base: 4, sm: 3 }}>
        {image && <Image width="36px" mb={4} src={image} alt={title} />}
        <Heading
          as={href ? "a" : "h3"}
          href={href}
          target="_blank"
          rel="noreferrer"
          size="md"
          display="flex"
          alignItems="center"
        >
          {title}
          {href && (
            <Image
              ml={2}
              src="/arrow-link.svg"
              alt={`link to ${title}`}
              transform="translateY(1px)"
            />
          )}
        </Heading>

        {toggleable ? (
          <>
            <Flex mt={2} alignItems="center">
              {/* Left column: stack text (if provided) */}
              <Box flex="1">
                {stack && (
                  <Text color="white" opacity={0.5}>
                    {stack}
                  </Text>
                )}
              </Box>
              {/* Right column: toggle button */}
              <Button
                size="sm"
                onClick={toggleDescription}
                variant="ghost"
                _focus={{ boxShadow: "none" }}
                _hover={{ bg: "transparent" }}
                color="white"
              >
                {isExpanded ? "↑" : "↓"}
              </Button>
            </Flex>
            {desc && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? "auto" : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <Text my={2}>{desc}</Text>
              </motion.div>
            )}
          </>
        ) : (
          // When toggleable is false (e.g. in Education), simply show the description and stack.
          <>
            {desc && <Text my={2}>{desc}</Text>}
            {stack && (
              <Text color="white" opacity={0.5}>
                {stack}
              </Text>
            )}
          </>
        )}
      </GridItem>
    </Grid>
  );
};

Experience.propTypes = {
  side: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  stack: PropTypes.string,
  image: PropTypes.string,
  href: PropTypes.string,
  toggleable: PropTypes.bool,
};

Experience.defaultProps = {
  toggleable: true, // Toggle functionality is enabled by default.
};
