import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessageThunk } from '../../store/slice/message/messageThunk'

const SendMessage = () => {

    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.userReducer)
    const [message, setMessage] = useState('')

    const handleSendMessage = () => {
        dispatch
            (sendMessageThunk({
                receiverId: selectedUser?._id,
                message
            }))
        setMessage('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSendMessage()
        }
    }
    return (
        <div className='max-h-[3rem] flex p-1'>
            <input
                type="text"
                placeholder="Type here..."
                className="input relative w-full outline-none rounded-l-3xl bg-gray-100 border-gray-50 hover:border-gray-300 px-4 rounded-r-3xl peer"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown} />
            <button
                className="absolute right-1 btn btn-square rounded-3xl hover:bg-[#31b4e4] hover:text-white peer-focus:bg-[#54bee4] peer-focus:text-white w-12 border-l-2 border-l-[#54bee4] outline-none"
                onClick={handleSendMessage}>
                <IoSend />
            </button>
        </div>
    )
}


export default SendMessage