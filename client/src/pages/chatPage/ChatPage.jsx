import { useContext, useState } from "react";
import "./chatPage.scss";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../../components/sideDrawer/SideDrawer";
import MyChats from "../../components/myChats/MyChats";
import ChatBox from "../../components/chatBox/ChatBox";

const ChatPage = () => {
  const [allChats, setAllChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="chatPage">
      <SideDrawer setAllChats={setAllChats} allChats={allChats} />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="90vh"
        p="10px"
      >
        <MyChats setAllChats={setAllChats} allChats={allChats} />
        <ChatBox />
      </Box>
    </div>
  );
};

export default ChatPage;
