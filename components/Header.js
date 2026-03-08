import { Flex, Image } from "@chakra-ui/react"
import NextLink from "next/link"
import { useEffect, useState } from "react"

export const Header = () => {
  const [hasMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <Flex
      position="fixed"
      top={0}
      width="full"
      p={4}
      as="header"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image src="/logo.svg" alt="Bonhomme" />

      <NextLink href="/blogs" passHref>
        <a style={{ color: "white", opacity: 0.7, fontSize: "14px" }}>Blogs</a>
      </NextLink>
    </Flex>
  )
}
