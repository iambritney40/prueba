import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { When } from 'react-if';
import HomeContent from '../../components/home-content';
import Header from '../../components/Header';
import ChatWidgetLive from '../../components/ChatWidgetLive';
import { ChatContext } from '../../context/ChatContext';
import { SocketContext } from '../../context/SocketContext';

const Chat = () => {
    const location = useLocation();
    const chatContext = useContext(ChatContext);
    const { establishConnection, terminateConnection } = useContext(SocketContext);

    const [params, setParams] = useState(new URLSearchParams(location.search));

    // useEffect(() => {
    //     chatContext.visible.set(true);

    //     const $socket = io(`${process.env.REACT_APP_BASE_URL}:8081`);
    //     socketContext.socket.set($socket);

    //     $socket.emit('joinRoom', { username: params.get('username'), room: params.get('room') });

    //     $socket.on('roomUsers', ({ room, users }) => {
    //         // outputRoomName(room);
    //         // outputUsers(users);

    //         console.log(room, users);
    //     });

    //     return () => {
    //         $socket.close();
    //     };
    // }, []);

    useEffect(() => {
        chatContext.visible.set(true);

        const username = params.get('username');
        const room = params.get('room');

        establishConnection({ username, room });

        return () => {
            terminateConnection();
        };
    }, []);

    return (
        <>
            <div style={{ minHeight: '100vh' }} className="position-relative">
                <div>
                    <Header />
                    <HomeContent disabled />
                </div>
            </div>
            <When condition={chatContext.visible.value}>
                <ChatWidgetLive />
            </When>
        </>
    );
};

export default Chat;
