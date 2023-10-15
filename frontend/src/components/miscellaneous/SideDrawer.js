import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import favicon from "./favicon.png";
import FaviconLight from "./FaviconLightMode.png";
import { Link } from "react-router-dom";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import logo from "../Logo3.png";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import "./SideDrawer.css";
import { useColorMode } from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

function SideDrawer(props) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  function handleToggleColorMode() {
    toggleColorMode();
  }

  function handleHomeButton() {
    history.push("/chats");
  }

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        style={{
          background: "transparent",
        }}
      >
        <div className="logo-container">
          <Text
            fontSize="2xl"
            fontFamily="Montserrat"
            d={"flex"}
            color={colorMode === "light" ? "black" : "white"}
            className="display-only"
          >
            <img
              src={colorMode === "light" ? FaviconLight : favicon}
              alt="favi"
              className="favicon"
            />
            CHAT-FUSION
          </Text>
        </div>
        <img
          src={colorMode === "light" ? FaviconLight : favicon}
          alt="favi"
          className="favicon1"
        />
        <div>
          <Tooltip label="Search Users to chat" hasArrow placement="right">
            <Button
              variant="ghost"
              onClick={onOpen}
              color={colorMode === "light" ? "black" : "white"}
              isDisabled={props.buttonProp}
              style={{
                display: `${props.display}`,
              }}
            >
              <i className="fas fa-search" color="black"></i>
              <Text
                d={{ base: "none", md: "flex" }}
                px={4}
                color={colorMode === "light" ? "black" : "white"}
              >
                Search User
              </Text>
            </Button>
          </Tooltip>

          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />

              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2} color={colorMode === "light" ? "black" : "white"}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  color={colorMode === "light" ? "black" : "white"}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button
            onClick={handleHomeButton}
            mr={2}
            style={{
              background: colorMode === "light" ? "#d3d3d3" : "none",
              display: `${props.displayHome === "block" ? "inline" : "none"}`,
            }}
          >
            <AiFillHome fontSize={"20px"}/>
          </Button>
          <Button
            onClick={handleToggleColorMode}
            mr={2}
            style={{ background: colorMode === "light" ? "#d3d3d3" : "none" }}
          >
            {colorMode === "light" ? <FaMoon /> : <BsFillSunFill />}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              // bg="#d3d3d3"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem color={colorMode === "light" ? "black" : "white"}>
                  My Profile
                </MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <Link to="/about">
                <MenuItem color={colorMode === "light" ? "black" : "white"}>
                  About
                </MenuItem>
              </Link>

              <MenuDivider />

              <MenuItem
                color={colorMode === "light" ? "black" : "white"}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            color={colorMode === "light" ? "black" : "white"}
          >
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2} color={"white"}>
              <Input
                className={colorMode === "light" ? "chat-name1" : "chat-name2"}
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                color={colorMode === "light" ? "black" : "white"}
              />
              <Button
                onClick={handleSearch}
                color={colorMode === "light" ? "black" : "white"}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
