import React, { useEffect, useState, useRef } from 'react'
import UserMessage from './UserMessage'
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/messageThunk';
import SendMessage from './SendMessage';
import { Link } from 'react-router-dom'

const themeOptions = ["light", "cupcake", "bumblebee", "emerald", "corporate", "cmyk", "autumn", "acid", "lemonade", "winter", "nord", "caramellatte", "silk", "lofi","retro", "cyberpunk", "valentine", "garden", "pastel", "fantasy", "wireframe"];

const bgOptions = [
  { key: 'default', label: 'Default image', value: "linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url('/src/assets/messagebg2.svg')" },
  { key: 'none', label: 'None', value: 'none' },
  { key: 'soft', label: 'Soft gradient', value: 'linear-gradient(135deg,#f8fafc,#eef2ff)' },
  {key:'captain', label: 'Captain', value:"linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0)), url('/src/assets/captain.jpeg')"},
  {key:'shelby', label: 'Shelby', value:"linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0)), url('/src/assets/shelby.jpeg')"},
  {key:'beautyscene', label: 'Beauty Scene', value:"linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0)), url('/src/assets/beautyscene.jpeg')"},
  {key:'dragon', label: 'Dragon', value:"linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0)), url('/src/assets/dragon.jpeg')"},
  {key:'sky', label: 'Sky', value:"linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), url('/src/assets/sky.jpeg')"},
]

const Message = () => {
  const dispatch = useDispatch()
  const { selectedUser, userProfile } = useSelector((state) => state.userReducer)
  const { messages } = useSelector(state => state.messageReducer)
  const [themeIndex, setThemeIndex] = useState(() => {
    const saved = window.localStorage.getItem("gupshupThemeIndex")
    return saved ? Number(saved) : 0
  })
  const [bgKey, setBgKey] = useState(() => {
    const saved = window.localStorage.getItem("gupshupBgKey")
    return saved || 'default'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const theme = themeOptions[themeIndex] || themeOptions[0]

  const selectedBgValue = bgOptions.find((b) => b.key === bgKey)?.value || bgOptions[0].value

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }))
    }
  }, [selectedUser])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    window.localStorage.setItem("gupshupThemeIndex", String(themeIndex))
  }, [theme, themeIndex])

  useEffect(() => {
    window.localStorage.setItem("gupshupBgKey", bgKey)
  }, [bgKey])

  useEffect(() => {
    const handleOutside = (e) => {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

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
          <div className='flex flex-row py-1 justify-between relative border-b border-gray-300'>
            <User userDetails={selectedUser} />
            <div className='absolute right-2 top-3'>
              <div ref={dropdownRef} className={`dropdown dropdown-end ${menuOpen ? 'dropdown-open' : ''}`}>
                <button type='button' className='btn btn-ghost btn-md rounded-xl' onClick={() => setMenuOpen((v) => !v)}>☰</button>
                <ul className='dropdown-content menu p-3 shadow bg-base-100 outline-none rounded-sm w-56'>
                  <li className='mb-2'>
                    <div className='text-sm rounded-sm font-medium mb-1'>Theme</div>
                    <select
                      className='outline-none select select-sm select-bordered w-full'
                      value={theme}
                      onChange={(e) => {
                        setThemeIndex(themeOptions.indexOf(e.target.value))
                        setMenuOpen(false)
                      }}
                    >
                      {themeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </li>
                  <li className='mb-2'>
                    <div className='text-sm font-medium mb-1'>Background</div>
                    <select
                      className='outline-none select select-sm select-bordered w-full'
                      value={bgKey}
                      onChange={(e) => {
                        setBgKey(e.target.value)
                        setMenuOpen(false)
                      }}
                    >
                      {bgOptions.map((b) => (
                        <option key={b.key} value={b.key}>{b.label}</option>
                      ))}
                    </select>
                  </li>
                  <li className='mb-2'>
                    <div className='text-sm font-semibold mb-1'>Profile</div>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className="avatar">
                        <div className="w-14 rounded-full">
                          <img src={userProfile?.avatar} alt='avatar' />
                        </div>
                      </div>
                      <div>
                        <div className='font-semibold'>{userProfile?.fullName}</div>
                        <div className='text-sm opacity-70'>@{userProfile?.username}</div>
                      </div>
                    </div>
                    <div className='text-sm'>
                      <div className='mb-1'>Full name: <span className='font-semibold'>{userProfile?.fullName}</span></div>
                      <div>Username: <span className='font-semibold'>@{userProfile?.username}</span></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#54bee4]/15 scrollbar-track-[#c8e8f4]/15 px-4 py-2 flex flex-col gap-2 justify-start items-start bg-gray-50'
            style={
              selectedBgValue === 'none'
                ? { backgroundImage: 'none' }
                : { backgroundImage: selectedBgValue, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }
            }
          >
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