import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/userSlice'

const User = ({ userDetails }) => {

    const dispatch = useDispatch()
    const { selectedUser, userProfile } = useSelector(state => state.userReducer)

    const { onlineUsers } = useSelector(state => state.socketReducer)
    console.log(onlineUsers?.includes(userDetails?._id))
    const isUserOnline = onlineUsers?.includes(userDetails?._id)

    const handleUserClick = () => {
        dispatch(setSelectedUser(userDetails))
    }

    return (
        <div onClick={handleUserClick}
            className={`flex hover:bg-gray-200 mx-2 rounded-[10px] px-2 ${userDetails?._id === selectedUser?._id && 'bg-gray-200'}`}>
            <div className={`avatar ${isUserOnline ? 'avatar-online' : ''}`}>
                <div className="p-1 w-14">
                    <img className='rounded-full' src={userDetails?.avatar} />
                </div>
            </div>
            <div className='flex flex-col  justify-center p-2 '>
                <h3 className='text-[15px] line-clamp-1'>{userDetails?.fullName} </h3>
                <p className='text-[12px]'>{userDetails?.username} </p>
            </div>
        </div>
    )
}

export default User