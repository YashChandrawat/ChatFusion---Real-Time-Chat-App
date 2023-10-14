import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Input,
  Checkbox,
  Button,
  Link,
  Tab,
} from "@chakra-ui/react";
import "./Homepage.css";
import { Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { animate, motion } from "framer-motion"; // Import motion from framer-motion
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-homepage">
        <Container
          maxW={"xl"}
          maxH={"100vh"}
          centerContent
          fontFamily={"Montserrat"}
          p={"10"}
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"md"}
          bg={"rgba(0,0,0,0.1)"}
        >
          <Text
            fontSize={"5xl"}
            mt={"auto"}
            mb={"5"}
            w={"100%"}
            textAlign={"center"}
            position={"relative"}
            zIndex={"1"}
            color={"white"}
          >
            Chat-Fusion
          </Text>

          <Tabs
            variant="soft-rounded"
            w={"100%"}
            position={"relative"}
            zIndex={"1"}
          >
            <TabList
              display={"flex"}
              justifyContent={"space-between"}
              mb={"1em"}
            >
              <Tab w={"50vw"}>LOGIN</Tab>
              <Tab w={"50vw"}>SIGNUP</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login color={"white"}/>
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </div>
    </motion.div>
  );
}

export default Homepage;
