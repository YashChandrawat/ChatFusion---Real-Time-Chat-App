import React from "react";
import SideDrawer from "../miscellaneous/SideDrawer";
import { Text, Stack } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import {
  AiFillMessage,
  AiOutlineSearch,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";

import { CgDarkMode } from "react-icons/cg";

import { IoMdNotifications } from "react-icons/io";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import { BiSolidUser } from "react-icons/bi";

import "./About.css";
import Footer from "../Footer/Footer";

function About() {
  const features = [
    { name: "Instant Messaging", icon: <AiFillMessage size={64} /> },
    { name: "User Search", icon: <AiOutlineSearch size={64} /> },
    { name: "Group Chats", icon: <AiOutlineUsergroupAdd size={64} /> },
    { name: "Dark Mode", icon: <CgDarkMode size={64} /> },
    { name: "Notification System", icon: <IoMdNotifications size={64} /> },
    { name: "User Profiles", icon: <BiSolidUser size={64} /> },
  ];

  return (
    <div className="about-container">
      <SideDrawer
        className="sidedrawer-about"
        style={{ fontFamily: "Montserrat" }}
        buttonProp = "false"
        display = "none"
        displayHome = "block"
      />
      <Stack spacing={3}>
        <div className="upper-section">
          <div className="main-about">
            <div className="left-part-about">
              <Text fontSize={{ base: "xl", md: "3xl" }} className="text-3xl">
                About Us
              </Text>
              <Text fontSize="xl" className="text-xl">
                Chat-Fusion is a real-time chat application that brings people
                together, allowing them to connect and communicate effortlessly.
                With a user-friendly interface and a commitment to making your
                chat experience enjoyable, Chat-Fusion is the ideal platform for
                staying connected with friends, family, and colleagues.
              </Text>
            </div>
            <div className="right-part-about">
              <img
                src={
                  "https://www.stellardigital.in/public/images/63be8ead1fcd0.gif"
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="middle-section">
          <Text fontSize={{ base: "xl", md: "3xl" }} className="text-3xl2">
            Key Features
          </Text>
          <UnorderedList
            className="ul-list"
            fontSize="xl"
            style={{ margin: "0 auto" }}
          >
            <ListItem className="li-list">
              <b>Instant Messaging :</b> Chat with friends and family in
              real-time, no matter where they are in the world.
            </ListItem>
            <ListItem>
              <b>User Search :</b> Easily find and connect with new users by
              searching for their names or emails.
            </ListItem>
            <ListItem>
              <b>Group Chats :</b> Create and join group chats to engage in
              conversations with multiple people at once.
            </ListItem>
            <ListItem>
              <b>Dark Mode :</b> Customize your chat experience with a sleek
              dark mode for a comfortable viewing experience, especially in
              low-light settings.
            </ListItem>
            <ListItem>
              <b>Notification System :</b> Stay informed with a notification
              system that alerts you to new messages and updates.
            </ListItem>
            <ListItem>
              <b>User Profiles :</b> Personalize your profile with a name,
              profile picture, and more.
            </ListItem>
          </UnorderedList>
          <div className="features-sec">
            {features.map((feature, index) => (
              <div key={index} className="feature-single">
                {feature.icon}
                <p>{feature.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Stack>
      <Footer />
    </div>
  );
}

export default About;
