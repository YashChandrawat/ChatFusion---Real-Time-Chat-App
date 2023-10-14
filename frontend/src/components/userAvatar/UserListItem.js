import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../../Context/ChatProvider";
import { useColorMode } from "@chakra-ui/react";

const UserListItem = ({ handleFunction }) => {
  const { user } = ChatState();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      border={"1px solid gray"}
      // bg="transparent"
      background={colorMode === "light" ? "#dbdbdb" : "#273443"}
      _hover={{
        border: "1px solid white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text color={colorMode === "light" ? "black" : "white"}>
          {user.name}
        </Text>
        <Text fontSize="xs" color={colorMode === "light" ? "black" : "white"}>
          <b style={{ color: colorMode === "light" ? "black" : "white" }}>
            Email :{" "}
          </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
