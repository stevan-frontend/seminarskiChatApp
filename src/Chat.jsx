import { useEffect, useState } from "react";

function Chat({ drone, currentUser }) {
  const [chatMessages, setChatMessages] = useState([]);
  const userColor = "#ffffff";

  useEffect(() => {
    function onRoomData(message, client) {
      const newMessage = {
        id: Math.random().toString(36).slice(2, 9),
        message: message.data,
        author:
          client.id === drone.clientId
            ? currentUser
            : message.clientData.username,
        color:
          client.id === drone.clientId ? userColor : message.clientData.color,
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
          <p className="author" style={{ color: message.color }}>
            {message.isCurrentUser ? "You" : message.author}
          </p>
          <p>{message.message}</p>
        </div>
      ))}
    </section>
  );
}

export default Chat;
