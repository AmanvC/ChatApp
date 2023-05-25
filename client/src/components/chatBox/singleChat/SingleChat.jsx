import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Avatar, Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import { getSenderFullDetails, getSenderName } from "../../../config/ChatLogic";
import UpdateGroupChatModal from "./updateGroupChatModal/UpdateGroupChatModal";
import ProfileModal from "../../sideDrawer/profileModal/ProfileModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { currentUser, selectedChat, setSelectedChat } =
    useContext(AuthContext);

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "1.6em", md: "1.7em" }}
            pb="3"
            px="2"
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat.isGroupChat ? (
              <Box
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="2px solid lightgray"
                pb="3"
              >
                {getSenderName(currentUser, selectedChat.users)}
                <ProfileModal
                  user={getSenderFullDetails(currentUser, selectedChat.users)}
                >
                  <Avatar
                    color="white"
                    fontWeight="600"
                    backgroundColor="black"
                    cursor="pointer"
                    name={getSenderName(currentUser, selectedChat.users)}
                    src={
                      getSenderFullDetails(currentUser, selectedChat.users)
                        ?.picture
                    }
                  />
                </ProfileModal>
              </Box>
            ) : (
              <Box
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="2px solid lightgray"
                pb="3"
              >
                {selectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </Box>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p="3"
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* Show Messages Here */}
          </Box>
        </>
      ) : (
        <Box
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
            Select a chat to continue.
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
