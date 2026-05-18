import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import User from './User';
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux"
import { getOtherUsersThunk, logoutUserThunk } from '../../store/slice/user/userThunk';
import { useNavigate } from "react-router-dom"

const UserSideBar = () => {

  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const { otherUsers, userProfile } = useSelector(state => state.userReducer)

  const handleLogout = async () => {
    await dispatch(logoutUserThunk())
  }
  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers)
    } else {
      setUsers(otherUsers.filter(user => {
        return (
          user.username.toLowerCase().includes(searchValue.toLowerCase()) || user.fullName.toLowerCase().includes(searchValue.toLowerCase())
        )
      }))
    }
  }, [searchValue, otherUsers])
  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk())
    })()
  }, [])

  return (
    <div className='max-w-[21rem] w-full h-screen flex flex-col border-r-1 border-gray-300 rounded-[2px]'>
      <div className='flex items-center mx-3 pt-1'>
        <img src="\src\assets\gupshup.ico" className='size-9' />
        <h1 className='text-[#00A8E7] mx-3 font-bold'>GUP-SHUP</h1>
      </div>
      <div className='px-3 py-1'>
        <label className="input max-w-[24rem] w-full outline-none bg-gray-100 border-gray-100 active:border-[#54bee4] focus-within:border-[#54bee4] focus:ring-1 hover:border-gray-300 rounded-2xl h-9 placeholder:text-gray-800">
          <input onChange={(e) => setSearchValue(e.target.value)} type="search" required placeholder="Search for a friend 👥" />
          <FiSearch />
        </label>
      </div>
      <div className='h-full flex flex-col gap-1 overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-[#54bee4]/15 scrollbar-track-[#c8e8f4]/15 cursor-pointer'>
        {users?.map(userDetails => {
          return (
            <User key={userDetails?._id} userDetails={userDetails} />
          )
        })}
      </div>
      <div className='border-t-1 border-gray-300 border-r-1 flex justify-between px-2 py-1 rounded-md items-center '>
        <div onClick={() => navigate("/UserProfile.jsx")} className='hover:bg-gray-300 flex gap-3 items-center p-2 rounded-3xl '>
          <div className="avatar size-9 ">
            <div className="ring-info ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 ">
              <img src={
                userProfile?.avatar
              }
              />
            </div>
          </div>
          <h2>{userProfile?.fullName}</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-square flex flex-row w-20 text-gray-600 rounded-3xl">
          <p className='text-[15px] '>Logout</p>
          <HiOutlineLogout className='size-4' />
        </button>
      </div>
    </div>
  )
}

export default UserSideBar