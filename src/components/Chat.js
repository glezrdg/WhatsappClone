import db from "../firebase";
import firebase from "firebase";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useStateValue } from "../StateProvider";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3> {roomName} </h3>
          <p>
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <Avatar src={user.photoURL} sx={{ width: 56, height: 56 }} />
            <span className="chat__name">{message.name}</span>
            <span className="chat__messageitself">{message.message}</span>
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <div>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
        </div>

        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <button type="submit">Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
