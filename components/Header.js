import { Flex, Image } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const Header = () => {
  const [hasMounted, setMounted] = useState(false)
  const router = useRouter()
  const isBlogsPage = router.pathname.startsWith("/blogs")

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

      <NextLink href={isBlogsPage ? "/" : "/blogs"} passHref>
        <a style={{ color: "white", opacity: 0.7, fontSize: "14px" }}>
          {isBlogsPage ? "Home" : "Blogs"}
        </a>
      </NextLink>
    </Flex>
  )
}
