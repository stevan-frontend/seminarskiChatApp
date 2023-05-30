import { useState } from "react";

function ChatInput({ handleSendMessage }) {
  const [message, setMessage] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      return;
    }
    handleSendMessage(message);
    setMessage("");
  };

  return (
    <form className="chatForm" onSubmit={sendMessage}>
      <input
        type="text"
        placeholder="Write a message..."
        autoFocus
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
