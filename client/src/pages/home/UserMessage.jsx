import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessageThunk } from '../../store/slice/message/messageThunk'

const UserMessage = ({ messageDetails }) => {
    const dispatch = useDispatch()
    const messageRef = useRef(null)
    const { userProfile, selectedUser } = useSelector(state => state.userReducer)
    const [timeLabel, setTimeLabel] = useState("")
    const [showDeleteButton, setShowDeleteButton] = useState(false)

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        }
    }, [])

    useEffect(() => {
        const createdAt = messageDetails?.createdAt || messageDetails?.createdAt
        if (!createdAt) return

        const getLabel = () => {
            const now = new Date()
            const then = new Date(createdAt)
            const diff = Math.floor((now - then) / 1000) // seconds

            if (diff < 60) return 'just now'
            const diffM = Math.floor(diff / 60)
            if (diffM < 60) return `${diffM}m ago`
            const diffH = Math.floor(diffM / 60)
            if (diffH < 24) return `${diffH}h ago`

            // older: show date
            return then.toLocaleString()
        }

        setTimeLabel(getLabel())

        const t = setInterval(() => {
            setTimeLabel(getLabel())
        }, 30000)

        return () => clearInterval(t)
    }, [messageDetails])

    const handleShowDelete = (event) => {
        event.preventDefault()
        setShowDeleteButton(true)
    }

    const handleDelete = () => {
        if (!window.confirm('Delete this message❓')) {
            return
        }
        dispatch(deleteMessageThunk(messageDetails?._id))
        setShowDeleteButton(false)
    }

    const handleCancel = () => {
        setShowDeleteButton(false)
    }

    return (
        <div className='w-full'>
            <div
                ref={messageRef}
                onDoubleClick={handleShowDelete}
                onContextMenu={handleShowDelete}
                className={`chat w-full ${userProfile?._id === messageDetails?.senderId ? 'chat-end' : 'chat-start'}`}
            >
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={userProfile?._id === messageDetails?.senderId ? userProfile.avatar : selectedUser.avatar}
                        />
                    </div>
                </div>
                <div className="chat-bubble">
                    <div className="chat-header">
                        <time className="text-xs opacity-50" title={new Date(messageDetails?.createdAt).toLocaleString()}>{timeLabel || new Date(messageDetails?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                    </div>
                    <div className='flex flex-row gap-5'> 
                    {messageDetails?.message}
                    {showDeleteButton && (
                        <div className="mt-0 flex justify-end gap-1">
                            <button type="button" className="btn btn-xs btn-error" onClick={handleDelete}>
                                Delete
                            </button>
                            <button type="button" className="btn btn-xs btn-outline" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                        
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMessage