import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms,setRooms]= useState([])
  const [{user},dispatch]=useStateValue()

  useEffect(()=>{
    db.collection("rooms").onSnapshot((snapshot) => setRooms(snapshot.docs.map((doc)=>({
      id:doc.id,
      data:doc.data()
    }))))
  },[])
  
  return (
    <div className="sideBar">
      <div className="sideBarHeader">
        <Avatar src={user?.photoURL} />
        <div className="sideBarRight">
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
      <div className="sideBarSearch">
        <div className="sideBarSearchContainer">
          <SearchOutlined />
          <input placeholder="Search or Start a new chat" type="text" />
        </div>
      </div>

      <div className="sideBarChat">
        <SidebarChat addnewChat/>
        {rooms.map((room)=>(
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
