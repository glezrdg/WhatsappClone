import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import { useStateValue } from "../StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [chat, setChat] = useState("");

  const [{ user }, dispatch] = useStateValue();

  const handleChange = (e) => {
    setChat(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar ">
      <div className="sidebar__header">
        <div className="sidebar__headerProfile">
          <Avatar src={user?.photoURL} />
          <h3>{user.displayName}</h3>
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search or start a new chat"
            type="text"
            value={chat}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="sidebar__chats ">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
