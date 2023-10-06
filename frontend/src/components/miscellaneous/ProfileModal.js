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

import { BiSolidVideo } from "react-icons/bi";
import { Tooltip } from "@chakra-ui/tooltip";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              style={{ backgroundColor: "#5E548C", marginRight: "6%" }}
            />
          </Tooltip>
          <Tooltip label="Video Call" hasArrow placement="bottom">
            <IconButton
              d={{ base: "flex" }}
              icon={<BiSolidVideo />}
              style={{ backgroundColor: "#5E548C", marginRight: "6%" }}
            />
          </Tooltip>
          <Tooltip label="View Profile" hasArrow placement="bottom">
            <IconButton
              d={{ base: "flex" }}
              icon={<HamburgerIcon />}
              onClick={onOpen}
              // style={{ backgroundColor: "#5E548C"}}
            />
          </Tooltip>
        </div>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="QuickSand"
            d="flex"
            justifyContent="center"
            color={'white'}
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
              objectFit={'cover'}
            />
            <Text
              fontSize={{ base: "25px", md: "25px" }}
              fontFamily="QuickSand"
              color={'white'}
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
