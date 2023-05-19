import { useContext } from "react";
import "./chatPage.scss";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../../components/sideDrawer/SideDrawer";
import MyChats from "../../components/myChats/MyChats";
import ChatBox from "../../components/chatBox/ChatBox";

const ChatPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="chatPage">
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="90vh"
        p="10px"
      >
        <MyChats />
        <ChatBox />
      </Box>
    </div>
  );
};

export default ChatPage;
