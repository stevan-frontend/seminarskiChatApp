import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "./App.css";

function ChatApp() {
  const [drone, setDrone] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const newDrone = new window.ScaleDrone("vnayXOhQ6Da8IN7j");
    setDrone(newDrone);

    return () => {
      newDrone.close();
    };
  }, []);

  const handleSetNickname = () => {
    let nickname = "";
    while (!nickname.trim()) {
      nickname = prompt("Please enter your nickname:");
      if (nickname === null) {
        return;
      }
    }
    setCurrentUser(nickname);
  };

  const handleSendMessage = (message) => {
    if (drone) {
      drone.publish({
        room: "observable-room",
        message: {
          data: message,
          clientData: {
            username: currentUser,
            color: "#ffffff",
          },
        },
      });
    }
  };

  return (
    <div className="body">
      <Header />
      {currentUser ? (
        <Main
          drone={drone}
          currentUser={currentUser}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <button className="nickBtn" onClick={handleSetNickname}>
          Enter Nickname
        </button>
      )}
      <Footer />
    </div>
  );
}

export default ChatApp;
