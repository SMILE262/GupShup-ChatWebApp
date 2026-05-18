import React, { useEffect } from 'react'
import UserMessage from './UserMessage'
import { IoSend } from "react-icons/io5";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/messageThunk';
import SendMessage from './SendMessage';

const Message = () => {
  const dispatch = useDispatch()
  const { selectedUser } = useSelector((state) => state.userReducer)
  const { messages } = useSelector(state => state.messageReducer)

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }))
    }
  }, [selectedUser])

  return (
    <>
      {!selectedUser ? (
        <div className='flex items-center justify-center w-full flex-col gap-5'>
          <div className='flex gap-x-2'> 
            <h1 className='text-xl'>Welcome to GupShup</h1>
            <img src="\src\assets\gupshup.ico" className='size-9' />
          </div>
          <p>Please select a person to continue your chat!!</p>
        </div>
      ) : (
        <div className='w-full h-screen  flex flex-col'>
          <div className='flex flex-col py-1 border-b border-gray-300'>
            <User userDetails={selectedUser} />
          </div>
          <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#54bee4]/15 scrollbar-track-[#c8e8f4]/15 px-4 py-2 flex flex-col gap-2 justify-start items-start bg-gray-50' style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url('/src/assets/messagebg2.svg')" }}>
            {messages?.map(messageDetails => {
              return <UserMessage key={messageDetails?._id} messageDetails={messageDetails} />
            })}
          </div>
          <SendMessage />
        </div>
      )}

    </>
  )
}

export default Message