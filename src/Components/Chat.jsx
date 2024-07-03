import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Message from "./Message";
import Input from "./Input";

const Chat = () => {
  // const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Tyler</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Message/>
      <Input/>
    </div>
  );
};

export default Chat;