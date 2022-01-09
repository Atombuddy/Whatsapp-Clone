import React, { useEffect, useReducer, useState }  from "react";
import "./Chat.css"
import { Avatar, IconButton } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import AttachFile from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import Mic from "@mui/icons-material/Mic";
import { useParams  } from "react-router-dom";
import db from "./firebase"
import firebase from "firebase";
import { useStateValue } from './StateProvider';

function Chat(){

    const [input,setInput] =useState("");
    const [seed,setSeed] =useState("");
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState("");
    const [messages,setMessages]=useState([])
    const [{user},dispatch]=useStateValue()

    useEffect(()=>{
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name)
            })

        }
        db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").
        onSnapshot((snapshot)=>(setMessages(snapshot.docs.map((doc)=>doc.data()))))
        
    },[roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[roomId])

    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }
    
    return ( 
        <div className="chat">
            <div className="chatHeader">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chatHeaderInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "} {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()} </p>
                </div>
                <div className="chatHeaderRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                </div>
            </div>
            <div className="chatBody">
                {messages.map((message)=>(
                    <p className={`chatMessage ${message.name===user.displayName && "chatReceiver"}`}>
                        <span className="chatName">{message.name}</span>
                        {message.message}
                        <span className="chatTimestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className="chatFooter">
                <InsertEmoticon />
                <form>
                    <input value={input} type="text" placeholder="Type a message" onChange={(e)=> setInput(e.target.value)}/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
     );
}
 
export default Chat;