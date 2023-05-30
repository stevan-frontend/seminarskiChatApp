import Chat from "./Chat";
import ChatInput from "./ChatInput";

const Main = ({ drone, currentUser, handleSendMessage }) => {
  return (
    <main>
      <Chat drone={drone} currentUser={currentUser} />
      <ChatInput handleSendMessage={handleSendMessage} />
    </main>
  );
};

export default Main;
