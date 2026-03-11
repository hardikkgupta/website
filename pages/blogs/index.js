import {
  Box,
  Heading,
  Link,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

const blogs = [
  {
    title: "ML Inference Compilers",
    date: "February 18, 2026",
    slug: "ml-inference-compilers",
  },
  {
    title: "GPU Memory Hierarchy",
    date: "January 5, 2026",
    slug: "gpu-memory-hierarchy",
  },
];

export default function Blogs() {
  return (
    <>
      <Head>
        <title>Blogs - Hardik Gupta</title>
      </Head>

      <Box py="115px" px={4} maxWidth={600} mx="auto">
        <Heading as="h1" size="lg" mb={12} lineHeight="1.3">
          Blogs
        </Heading>

        <Table variant="unstyled">
          <Tbody>
            {blogs.map((blog) => (
              <Tr key={blog.slug}>
                <Td px={0} py={3} borderBottom="none">
                  <NextLink href={`/blogs/${blog.slug}`} passHref>
                    <Link textDecoration="underline" fontSize="md">
                      {blog.title}
                    </Link>
                  </NextLink>
                </Td>
                <Td px={0} py={3} borderBottom="none" textAlign="right">
                  <Text fontSize="md" opacity={0.5}>{blog.date}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
