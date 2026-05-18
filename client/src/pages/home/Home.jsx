import React, { useEffect } from 'react'
import Message from './Message.jsx'
import UserSideBar from './UserSideBar.jsx'
import { useDispatch, useSelector } from "react-redux"
import { initializeSocket, setOnlineUsers } from "../../store/slice/socket/socketSlice.js"
import { addMessage } from "../../store/slice/message/messageSlice.js"

const Home = () => {

  const dispatch = useDispatch()
  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer)

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(initializeSocket(userProfile?._id))
  }, [isAuthenticated])

  const { socket, onlineUsers } = useSelector(state => state.socketReducer)

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers))
    });
    socket.on("newMessage", (newMessage) => {
      dispatch(addMessage(newMessage));
    });
    return ()=>{
      socket.close()
    }
  },[socket,dispatch])

  return (
    <div className='flex w-full h-full'>
      <UserSideBar />
      <Message />
    </div>
  )
}

export default Home