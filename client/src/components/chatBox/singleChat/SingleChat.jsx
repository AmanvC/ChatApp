import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import { getSenderFullDetails, getSenderName } from "../../../config/ChatLogic";
import UpdateGroupChatModal from "./updateGroupChatModal/UpdateGroupChatModal";
import ProfileModal from "../../sideDrawer/profileModal/ProfileModal";
import { makeRequest } from "../../../utils/axios";
import ChatWindow from "./chatWindow/ChatWindow";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const { currentUser, selectedChat, setSelectedChat } =
    useContext(AuthContext);

  const toast = useToast();

  useEffect(() => {
    fetchAllMessages();
  }, [selectedChat]);

  const fetchAllMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      setLoading(true);
      const res = await makeRequest().get(`/messages/${selectedChat._id}`);
      setMessages(res.data?.data);
      setLoading(false);
      console.log(res.data.data);
    } catch (err) {
      toast({
        title: "Something went wrong!",
        description: "Please try again!",
        type: "error",
        duration: "4s",
        isClosable: true,
        position: "top",
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const res = await makeRequest().post("/messages", {
          chatId: selectedChat._id,
          content: newMessage,
        });
        if (res.data?.success) {
          setMessages((prev) => [...prev, res.data?.data]);
        }
      } catch (err) {
        toast({
          title: "Something went wrong!",
          description: "Cannot send the message!",
          type: "error",
          duration: "4s",
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleTypingMessage = (e) => {
    const inp = e.target.value.trimStart();
    setNewMessage(inp);
    // Typing indicator logic
  };

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
                  fetchAllMessages={fetchAllMessages}
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
            {loading ? (
              <Spinner
                size="xl"
                w="20"
                h="20"
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box overflowY="scroll" padding="10px">
                <ChatWindow messages={messages} selectedChat={selectedChat} />
              </Box>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt="3">
              <Input
                type="text"
                variant="filled"
                bg="white"
                placeholder="Type here..."
                _focus={{ backgroundColor: "white", border: "none" }}
                onChange={handleTypingMessage}
                value={newMessage}
              />
            </FormControl>
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
