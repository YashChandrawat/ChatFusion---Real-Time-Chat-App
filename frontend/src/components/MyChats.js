import { AddIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Avatar, Button, Menu, MenuButton } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "./MyChats.css";
import { MenuItem, MenuList } from "@chakra-ui/react";

const MyChats = ({ fetchAgain }) => {
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
      style={{background : "transparent"}}
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
        borderBottom={"2px solid white"}
      >
        INBOX
        <Menu isLazy>
          <MenuButton
            as={Button}
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          >
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <GroupChatModal>
                <Button d="flex" fontSize="17px">
                  New Group Chat +
                </Button>
              </GroupChatModal>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="url(https://cdn.join.chat/app/uploads/2020/05/whatsapp-bg.png)"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                // bg={selectedChat === chat ? "#D3D3D3" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                className="hover-effect"
                style={{borderBottom : "1px solid gray"}}
              >
                <div className="chats-sec">
                  <div className="Avatar-sec">
                    <Avatar src={user.pic} />
                  </div>
                  <div className="message-sec">
                    <Text>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        <b>{chat.latestMessage.sender.name} : </b>
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
