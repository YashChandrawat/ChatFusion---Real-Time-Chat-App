import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Avatar } from "@chakra-ui/react";

import "./styles.css";
import {
  IconButton,
  Spinner,
  Tooltip,
  background,
  useToast,
} from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon, PhoneIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import "./SingleChat.css";
import {
  AiOutlineSend,
  AiOutlinePaperClip,
  AiOutlineSmile,
} from "react-icons/ai";

import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  // Emoji Picker
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [addEmoji, setAddEmoji] = useState("");
  const handleEmojiSelect = (emoji) => {
    // Append the selected emoji to the current message
    setNewMessage((prevMessage) => prevMessage + emoji.native);
    setIsPickerOpen(false); // Close the emoji picker
  };

  function insertEmoji(e) {
    setNewMessage((prevMessage) => prevMessage + e);
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessageOnClick = () => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const messageData = {
          content: newMessage,
          chatId: selectedChat._id,
        };

        axios.post("/api/message", messageData, config).then((response) => {
          const { data } = response;
          socket.emit("new message", data);
          setMessages([...messages, data]);
        });
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  // Activity Track
  useEffect(() => {
    // Trigger the typing animation after the component has rendered
    const typingElements = document.querySelectorAll(".typing-text");
    typingElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("typing-active");
      }, index * 1000); // Adjust the delay as needed
    });
  }, []);

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Montserrat"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            borderBottom={"2px solid white"}
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {}
                  {getSender(user, selectedChat.users)}
                  <div className="avatar-side">
                    <ProfileModal
                      user={getSenderFull(user, selectedChat.users)}
                    />
                  </div>
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>

          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            style={{
              // backgroundColor : '#d4f3ef',
              backgroundSize: "cover",
              background:
                "url(https://cdn.join.chat/app/uploads/2020/05/whatsapp-bg.png)",
            }}
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            {isPickerOpen && (
              <div className={isPickerOpen ? "block-class" : "none-class"}>
                <Picker
                  data={data}
                  previewPosition="none"
                  onClickOutside={() => {
                    setIsPickerOpen(!isPickerOpen);
                  }}
                  onEmojiSelect={(e) => {
                    insertEmoji(e.native);
                    setIsPickerOpen(!isPickerOpen);
                  }}
                />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="input-section">
                <Tooltip label="Attach File" hasArrow placement="bottom">
                  <IconButton
                    d={{ base: "flex" }}
                    icon={<AiOutlinePaperClip />}
                    style={{ fontSize: "20px" }}
                  />
                </Tooltip>

                <Tooltip label="Attach Emoji" hasArrow placement="bottom">
                  <IconButton
                    d={{ base: "flex" }}
                    icon={<AiOutlineSmile />}
                    onClick={() => setIsPickerOpen(!isPickerOpen)}
                    style={{ fontSize: "20px" }}
                  />
                </Tooltip>

                <Input
                  variant="outline"
                  bg={"#D3D3D3"}
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  color={"black"}
                />

                <Tooltip label="Send Message" hasArrow placement="bottom">
                  <IconButton
                    d={{ base: "flex" }}
                    icon={<AiOutlineSend />}
                    onClick={sendMessageOnClick}
                    style={{ fontSize: "20px" }}
                  />
                </Tooltip>
              </div>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          d="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          flexDirection={"column"}
        >
          <Text
            className="chat-fusion-text"
            fontSize="5xl"
            pb={3}
            fontFamily="Montserrat"
          >
            <span>C</span>
            <span>H</span>
            <span>A</span>
            <span>T</span>
            <span>-</span>
            <span>F</span>
            <span>U</span>
            <span>S</span>
            <span>I</span>
            <span>O</span>
            <span>N</span>
          </Text>

          <div className="created-by">
            <Text fontSize="xl">
              Created by Yash Chandrawat, Vedika Patidar, Vishal Makwana
            </Text>
          </div>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
