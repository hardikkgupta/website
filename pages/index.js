import {
  Link,
  Box,
  Text,
  Heading,
  GridItem,
} from "@chakra-ui/react";
import Head from "next/head";
import { Grid } from "../components/Grid";
import { Experience } from "../components/Experience";
import Cursor from "../components/Cursor";
import { Avatar } from "../components/Avatar";

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
              <Link color="white" opacity={0.5} href="/resume.pdf">
                Resume
              </Link>
              <Text></Text>
            </Box>
          </GridItem>
        </Grid>

        <Box mb={14}>
          <Heading as="h2" size="md" mb={2}>
            About
          </Heading>
          <Text>
            I am a <s>first-year</s> second-year graduate student at{" "}
            <a href="https://twin-cities.umn.edu/">
              University of Minnesota, Twin Cities
            </a>
            , pursuing a Master’s in Robotics. Currently, I serve as a Graduate
            Teaching Assistant, mentoring students.
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
            stack="Artificial Intelligence • Computer Vision • Machine Learning • Reinforcement Learning • Natural Language Processing • Robotic Systems"
            toggleable={false}
          />

          <Experience
            image="bits.png"
            href="https://www.bits-pilani.ac.in/"
            side="2018 - 2023"
            title="Birla Institute of Technology and Science"
            desc="Bachelor's (B.E.) in Mechanical Engineering and Master's (M.Sc.) in Biological Science"
            stack="Robotics • Autonomous Mobile Robotics • Engines, Motors and Mobility • Vibrations and Control • Optimization"
            toggleable={false}
          />
{/* 
          <Heading as="h2" size="md" mt={14} mb={10}>
            Projects
          </Heading>

          <Experience
            href="https://github.com/hardikkgupta/fact-checker"
            side="Feb 2025"
            title={<span>Fact-Checker</span>}
            image="/politician.png"
            desc={
              <span>
                RAG system that lets you ask questions about Tim Walz and receive concise fact-checking answers with authorized sources.
                (For @AI x Journalism Hackathon)
              </span>
            }
            stack="Python • Flask • Docker • AWS • CI/CD"
          />

          <Experience
            href="https://github.com/hardikkgupta/ml-e2e"
            side="Oct 2024"
            title={<span>End-to-End Machine Learning Model</span>}
            image="/titanic.png"
            desc={
              <span>
                Logistic Regression model to predict passenger survival on the
                Titanic. The project encompasses model serialization, deployment
                as a RESTful API using Flask, containerization with Docker, and
                establishing CI/CD pipelines to automate testing and deployment on
                AWS EC2.
              </span>
            }
            stack="Python • Flask • Docker • AWS • CI/CD"
          />

          <Experience
            href="https://rentfree-app.vercel.app/"
            side="Jun 2024"
            title="RentFree - WebApp"
            image="/cheron.png"
            desc="Full stack web application enabling users to list, search, and manage rental properties and integrating secure user authentication and authorization with real-time updates on property availability and inquiries"
            stack="React • NodeJS • MongoDB • Express • AWS"
          />

          <Experience
            href="https://github.com/hardikkgupta/apple-detection"
            side="Dec 2023"
            title="Apple Detection and Counting"
            image="/apple.png"
            desc="Apple detection pipeline with YOLOv8, achieving 85.2% accuracy. Developed 3D point clouds using COLMAP and DBSCAN for clustering apple points. Applied RANSAC for ground and trunk detection, improving yield estimation by 16%."
            stack="Python • YOLOv8 • 3D Reconstruction • Filtering"
          /> */}

          <Box mb={14}>
            <Heading as="h2" size="md" mb={10}>
              Work Experience
            </Heading>

            <Experience
              image="/grad_logo.png"
              href="https://twin-cities.umn.edu/"
              side="Jun 2024 - present"
              title="Graduate Research Assistant"
              desc="Collaborated on developing a Bayesian inference model to analyze consumer decision-making using LLMs for optimal product evaluation. Conducted research on Transformer architecture, including tokenization and attention mechanisms, to understand Generative AI's role in consumer behavior."
              stack="Large Language Models • Mathematical Modeling"
            />

            <Experience
              image="/ubs.png"
              href="https://www.ubs.com/us/en.html"
              side="Feb 2023 - Jun 2023"
              title="Financial Analyst Intern"
              desc="Automated the analysis of Pension IPV, reducing CPV graph preparation time by 40%. Utilized Python, UBS tools, Totem, and Bloomberg to enhance financial data analysis"
              stack="Python • Excel Macros • VBA"
            />

            <Box mb={14}>
            <Heading as="h2" size="md" mb={10}>
              Other Collaborations
            </Heading>
            <Experience
              image="/iitg.svg"
              href="https://www.bits-pilani.ac.in/"
              side="Dec 2019 - May 2022"
              title="Summer Researcher"
              desc="Worked on robotic grasping using Haar Wavelet Transform to detect slip and load, which modeled the appropriate force range"
              stack="Python • Data Analysis"
            />
            <Experience
              image="/bits.png"
              href="https://www.bits-pilani.ac.in/"
              side="Dec 2019 - May 2022"
              title="Undergraduate Student Researcher"
              desc="Worked on three different projects: Evolutionary bioinformatics, Design of PEM cell and Hodgkin-Huxley model"
              stack="Python • Data Analysis"
            />

            <Experience
              image="/ericsson.png"
              href="https://www.ericsson.com/en"
              side="Aug 2020 - Dec 2020"
              title="Data Scientist Intern Intern"
              desc="Pre-processed and analyzed the telecom's site outage parameters’ and developed a primary machine learning classification pipeline for the same."
              stack="Python • Data Analysis"
            />

            














            <Heading as="h2" size="md" mt={14} mb={10}>
              Links
            </Heading>

            <Experience
              side="Email"
              title="@hardikgupta1999"
              href="mailto:hardikgupta1999@gmail.com"
              mb={4}
              toggleable={false}
            />
            <Experience
              side="Github"
              title="@hardikkgupta"
              href="https://github.com/hardikkgupta"
              mb={4}
              toggleable={false}
            />
            <Experience
              side="LinkedIn"
              title="@hardikguptaa"
              href="https://www.linkedin.com/in/hardikguptaa/"
              mb={4}
              toggleable={false}
            />
            <Experience
              side="X"
              title="@HardikkGuptaa"
              href="https://x.com/HardikkGuptaa"
              mb={4}
              toggleable={false}
            />
            <Experience
              side="Leetcode"
              title="@hardikkgupta"
              href="https://leetcode.com/u/hardikkgupta/"
              mb={4}
              toggleable={false}
            />
          </Box>
          </Box>
        </Box>

        <p>
          A big shoutout to Maxime Bonhomme for his awesome{" "}
          <a
            href="https://github.com/maximebonhomme/bonhomme-2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            website repository!
          </a>
        </p>
      </Box>
    </>
  );
}
