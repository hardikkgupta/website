import {
  Box,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const blogs = [
  {
    title: "ML Inference Compilers",
    date: "February 18, 2026",
    slug: "ml-inference-compilers",
    number: "01",
  },
  {
    title: "GPU Memory Hierarchy",
    date: "January 5, 2026",
    slug: "gpu-memory-hierarchy",
    number: "02",
  },
];

export default function Blogs() {
  return (
    <>
      <Head>
        <title>Blogs - Hardik Gupta</title>
      </Head>

      <Box py="115px" px={4} maxWidth={640} mx="auto">
        <MotionBox
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Heading as="h1" size="lg" mb={2} lineHeight="1.3">
            Blogs
          </Heading>
          <Text opacity={0.35} fontSize="sm" mb={14}>
            Writing about systems, GPUs, and ML infrastructure
          </Text>
        </MotionBox>

        <Box as="ul" listStyleType="none" m={0} p={0}>
          {blogs.map((blog, i) => (
            <MotionBox
              as="li"
              key={blog.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: 0.15 + i * 0.1,
              }}
            >
              <NextLink href={`/blogs/${blog.slug}`} passHref>
                <Link
                  _hover={{ textDecoration: "none" }}
                  display="block"
                  role="group"
                >
                  <Box
                    py={6}
                    borderBottom="1px solid"
                    borderBottomColor="whiteAlpha.100"
                    position="relative"
                    transition="all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
                    _hover={{
                      borderBottomColor: "whiteAlpha.200",
                    }}
                    pl={0}
                    _before={{
                      content: '""',
                      position: "absolute",
                      left: "-16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "2px",
                      height: "0%",
                      bgGradient: "linear(to-b, purple.500, pink.500)",
                      transition: "height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                      borderRadius: "full",
                    }}
                    sx={{
                      "&:hover::before": {
                        height: "60%",
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="baseline"
                    >
                      <Box>
                        <Text
                          fontSize="10px"
                          textTransform="uppercase"
                          letterSpacing="0.1em"
                          opacity={0.3}
                          mb={2}
                          fontFamily="mono"
                        >
                          {blog.number}
                        </Text>
                        <Text
                          fontSize="md"
                          color="white"
                          transition="opacity 0.3s ease"
                          _groupHover={{ opacity: 0.85 }}
                        >
                          {blog.title}
                        </Text>
                      </Box>
                      <Text
                        fontSize="sm"
                        opacity={0.3}
                        flexShrink={0}
                        ml={8}
                        fontFamily="mono"
                        letterSpacing="-0.01em"
                      >
                        {blog.date}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              </NextLink>
            </MotionBox>
          ))}
        </Box>
      </Box>
    </>
  );
}
