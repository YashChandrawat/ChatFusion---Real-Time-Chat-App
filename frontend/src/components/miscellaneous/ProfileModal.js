import { ViewIcon, PhoneIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import "./ProfileModel.css";

import { BiSolidVideo } from "react-icons/bi";
import { Tooltip } from "@chakra-ui/tooltip";
import { useColorModeContext } from "../ColorModeContext";
import { useHistory } from "react-router-dom";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const history = useHistory();
  function temp() {
    history.push("/chats/call");
  }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <div className="icon-settlement">
          <Tooltip label="Audio Call" hasArrow placement="bottom">
            <IconButton
              d={{ base: "flex" }}
              icon={<PhoneIcon />}
              style={{
                marginRight: "6%",
                color: colorMode === "light" ? "black" : "white",
                background: colorMode === "light" ? "transparent" : "#273443",
                border: colorMode === "light" ? "1px solid black" : "none",
              }}
            />
          </Tooltip>
          <Tooltip label="Video Call" hasArrow placement="bottom">
            <IconButton
              d={{ base: "flex" }}
              icon={<BiSolidVideo />}
              onClick={temp}
              style={{
                marginRight: "6%",
                color: colorMode === "light" ? "black" : "white",
                background: colorMode === "light" ? "transparent" : "#273443",
                border: colorMode === "light" ? "1px solid black" : "none",

                // background: colorMode === "light" ? "#4f4587" : "#273443",
              }}
            />
          </Tooltip>
          <Tooltip label="View Profile" hasArrow placement="bottom">
            <IconButton
              d={{ base: "flex" }}
              icon={<HamburgerIcon />}
              onClick={onOpen}
              style={{
                marginRight: "6%",
                color: colorMode === "light" ? "black" : "white",
                background: colorMode === "light" ? "transparent" : "#273443",
                border: colorMode === "light" ? "1px solid black" : "none",
              }}
            />
          </Tooltip>
        </div>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Montserrat"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              objectFit={"cover"}
            />
            <Text
              fontSize={{ base: "25px", md: "25px" }}
              fontFamily="Montserrat"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
