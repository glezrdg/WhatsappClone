import React, { useState, useEffect} from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';


function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed >>>', input);
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at..</p>
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
                <p className={`chat__message ${true &&'chat__receiver'}`}>
                    <span className="chat__name">
                        Layel
                    </span>
                    Hey Guys
                    <span className="chat__timestamp">
                        7:29pm
                    </span>
                </p>
                <p className="chat__message">
                    Hey Guysadsdddddddddddddd
                </p>
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
                
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message...'/>
                    <button onClick={sendMessage}type="submit" >Send a message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
                
                
            </div> 
        </div>
    )
}

export default Chat
