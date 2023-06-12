import { useEffect, useState } from "react";

function Chat({ drone, currentUser }) {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    function onRoomData(message, client) {
      const newMessage = {
        id: Math.random().toString(36).slice(2, 9),
        message: message.data,
        author:
          client.id === drone.clientId
            ? currentUser
            : message.clientData.username,

        isCurrentUser: client.id === drone.clientId,
      };

      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    const room = drone.subscribe("observable-room");
    room.on("data", onRoomData);

    return () => {
      room.off("data", onRoomData);
    };
  }, [drone, currentUser]);

  return (
    <section className="chatMessages">
      {chatMessages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.isCurrentUser ? "me" : "other"}`}
        >
          <p className="author" style={{ color: "#ffffff" }}>
            {message.isCurrentUser ? "You" : message.author}
          </p>
          <p>{message.message}</p>
        </div>
      ))}
    </section>
  );
}

export default Chat;
