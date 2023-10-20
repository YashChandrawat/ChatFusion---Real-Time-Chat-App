import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Avatar, Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "./MyChats.css";
import { useColorMode } from "@chakra-ui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const MyChats = ({ fetchAgain }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      style={{ background: "transparent" }}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Montserrat"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        style={{
          borderBottom:
            colorMode === "light" ? "2px solid black" : "2px solid white",

          color: colorMode === "light" ? "black" : "white",
        }}
      >
        INBOX
        <div className="display-none">
          <GroupChatModal>
            <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
              style={{
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
        </div>
        <div className="display-block">
          <GroupChatModal>
            <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              style={{
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              <AiOutlineUsergroupAdd/>
            </Button>
          </GroupChatModal>
        </div>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        style={{ background: "transparent" }}
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                style={{
                  background: "transparent",
                  borderBottom: "1px solid gray",
                }}
              >
                <div className="chats-sec">
                  <div className="Avatar-sec">
                    <Avatar />
                  </div>
                  <div>
                    <Text
                      style={{
                        color: colorMode === "light" ? "black" : "white",
                      }}
                    >
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text
                        fontSize="xs"
                        style={{
                          color: colorMode === "light" ? "black" : "white",
                        }}
                      >
                        <b
                          style={{
                            color: colorMode === "light" ? "black" : "white",
                          }}
                        >
                          {chat.latestMessage.sender.name} :{" "}
                        </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 40) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </div>
                </div>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
