import { Link, Box, Text, Heading, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import { Grid } from "../components/Grid"
import { Experience } from "../components/Experience"
import Cursor from "../components/Cursor"
import { Avatar } from "../components/Avatar"

export default function Home() {
  return (
    <>
      <Head>
        <title>Hardik Gupta</title>
      </Head>
      <Cursor />

      <Box py="115px" px={4} maxWidth={500} mx="auto">
        <Grid fluid templateColumns="repeat(4, 1fr)" mb={10} alignItems="center">
          <GridItem colSpan={1}>
            <Avatar />
          </GridItem>
          <GridItem colSpan={3}>
            <Box>
              <Heading as="h1" size="lg">
                Hardik Gupta
              </Heading>
              <Text>24. Graduate Student. Robots / Computer Science.</Text>
              <Text></Text>
              <Link
                color="white"
                opacity={0.5}
                href="/resume.pdf"
              >
                Resume
              </Link>
            </Box>
          </GridItem>
        </Grid>
        <Box mb={14}>
          <Heading as="h2" size="md" mb={2}>
            About
          </Heading>
          <Text>
            I am a <s>first-year</s> second-year graduate student at <a href="https://twin-cities.umn.edu/">University of Minnesota,
            Twin Cities</a>, pursuing a Master’s in Robotics. Prior to this, I completed a Bachelor's in Mechanical Engineering and 
            a Master's in Biological Sciences at <a href="https://www.bits-pilani.ac.in/">Birla Institute of Technology and Science 
            (BITS), Pilani, India</a>. Focused on developing better models for robots that constantly grow and improve.
          </Text>
          </Box>

          <Box mb={14}>
          <Heading as="h2" size="md" mb={10}>
            Education
          </Heading>

          <Experience
            image="grad_logo.png"
            href="https://twin-cities.umn.edu/"
            side="2023 - present"
            title="University of Minnesota, Twin Cities"
            desc="Master's (M.Sc.) in Robotics"
            stack="Aritificial Intelligence • Computer Vision • Machine Learning • Reinforcement Learning • Natural Language Processing • Robotic Systems"
          />

          <Experience
            image="undergrad_logo.png"
            href="https://www.bits-pilani.ac.in/"
            side="2018 - 2023"
            title="Birla Institute of Technology and Science"
            desc="Bachelor's (B.E.) in Mechanical Engineering and 
            Master's (M.Sc.) in Biological Science"
            stack = "Robotics • Autonomous Mobile Robotics • Engines Motors and Mobility • Vibrations and Control • Optimization..."
          />
        
        <Heading as="h2" size="md" mt={14} mb={10}>
            Projects
          </Heading>

          <Experience
            href="https://rentfree-app.vercel.app/"
            side="Jun 2024"
            title="RentFree - WebApp"
            desc="Making hot sauces with a friend, made in Brittany with local ingredients."
            stack="React • NodeJS • MongoDB • Express • AWS"
          />
          <Experience
            href="https://github.com/hardikkgupta/apple-detection"
            side="Dec 2023"
            title="Apple Detection and Counting"
            desc="Implemented an apple detection pipeline with YOLOv8, achieving 85.2% 
            accuracy. Developed 3D point clouds using COLMAP and DBSCAN for clustering 
            apple points. Applied RANSAC for ground and trunk detection, improving yield 
            estimation by 16%."
            stack="Python • YOLOv8 • 3D Reconstrution • Filtering"
          />
          <Experience
            href="/thesis.pdf"
            side="Dec 2022"
            title="Trajectory and Collision Avoidance"
            desc="Simulated a Nonlinear Model Predictive Control of the single robotic system for collision avoidance in a dynamic obstacle environment."
            stack="Python • Control • Optimization • Path Planning"
          />
          <Experience
            href="https://link.springer.com/article/10.1007/s00284-023-03298-w"
            side="Oct 2022"
            title={<span>Phylogenetic Study of the CRISPR-Cas</span>}
            desc={<span>Systematically investigate the evolutionary 
              framework of the CRISPR-Cas system in six <em>Enterobacteriaceae</em> species and 
              its evolutionary association with housekeeping genes as determined by the gyrB phenogram.</span>}
            stack="Clustering Algorithms • BLAST • Data Analysis"
          />
        
        <Box mb={14}>
          <Heading as="h2" size="md" mb={10}>
            Work Experience
          </Heading>

          <Experience
            href="https://iyk.app"
            side="2022 - present"
            title="Senior Frontend Engineer – IYK"
            desc="Building the Whole Wide World﹡"
            stack="Remix • Prisma • Tailwind • Shadcn"
          />
          <Experience
            href="https://everpress.com/"
            side="2020 - 2022"
            title="Full Stack & Technical Lead – Everpress"
            desc="Led a team of 5 engineers to develop our creator tools and e-commerce
        app. Collaborated closely with the Head of Product to track our tactical
        objectives, improve technical directions and shipping frequency."
            stack="React • Redux • Symfony • AWS"
          />
          <Experience
            side="2016 – 2020"
            title="Front End Engineer – Freelance"
            desc="Worked with a range of large and small agencies, start-ups and individuals to build products. Clients included Marvel App, United Nations, Netflix, Dropbox Design."
            stack="React • Redux • Styled Components • Framer Motion"
          />
          <Experience
            href="https://neverbland.com/"
            side="2014 – 2016"
            title="Front End Engineer – Neverbland"
            desc="Part of a tight-knit team of designers, developers and critical thinkers, I built MVP products and marketing experiences for start-ups."
            stack="React • Redux • CSSModules • Three.js"
          />

          <Heading as="h2" size="md" mt={14} mb={10}>
            Links
          </Heading>

          <Experience
            side="Email"
            title="@hardikgupta1999"
            href="mailto:hardikgupta1999@gmail.com"
            mb={4}
          />
          <Experience
            side="Github"
            title="@hardikkgupta"
            href="https://github.com/hardikkgupta"
            mb={4}
          />
          <Experience
            side="LinkedIn"
            title="@hardikguptaa"
            href="https://www.linkedin.com/in/hardikguptaa/"
            mb={4}
          />
          <Experience
            side="X"
            title="@HardikkGuptaa"
            href="https://x.com/HardikkGuptaa"
            mb={4}
          />
        </Box>
      </Box>
      </Box>
    </>
  )
}
