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
                  "https://i.pinimg.com/originals/50/78/a0/5078a05eb1b6847d93383eaa4c0ed500.gif"
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
              Instant Messaging: Chat with friends and family in real-time, no
              matter where they are in the world.
            </ListItem>
            <ListItem>
              User Search: Easily find and connect with new users by searching
              for their names or emails.
            </ListItem>
            <ListItem>
              Group Chats: Create and join group chats to engage in
              conversations with multiple people at once.
            </ListItem>
            <ListItem>
              Dark Mode: Customize your chat experience with a sleek dark mode
              for a comfortable viewing experience, especially in low-light
              settings.
            </ListItem>
            <ListItem>
              Notification System: Stay informed with a notification system that
              alerts you to new messages and updates.
            </ListItem>
            <ListItem>
              User Profiles: Personalize your profile with a name, profile
              picture, and more.
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
      <Footer/>
    </div>
  );
}

export default About;
