import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from "./firebase";
import "./sidebarChat.css"

function SidebarChat({id,name,addnewChat}) {
    
    const [seed,setSeed] =useState("")
    const [messages,setMessages]=useState("");

    useEffect(()=>{
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data())))
        }
    },[id])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

    const createChat =()=>{
        const roomName=prompt("Enter a name for the Chat")
        if(roomName){
            db.collection("rooms").add({
                name:roomName
            })
        }
    }

    return !addnewChat ? (
        <Link to={`/rooms/${id}`} key={id}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='sidebarChatInfo'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message} </p>
                </div>
            </div>
        </Link>  
    ) : (
        <div className='sidebarChat' onClick={createChat}><h2>Add New Chat</h2></div>
    );
}

export default SidebarChat;