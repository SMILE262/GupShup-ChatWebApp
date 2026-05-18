import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { loginUserThunk } from '../../store/slice/user/userThunk';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer)
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated])

  const handleInputChanges = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handelLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData))
    if (response?.payload?.success) {
      navigate("/")
    }
  };

  return (
    <div className='flex justify-center p-5  min-h-screen items-center '>
      <div className='flex flex-col bg-base-300 p-5 gap-5 rounded max-w-160 w-full'>
        <h3 className='text-2xl font-semibold'> Please Login...!</h3>
        <label className="input validator outline-none w-full">
          <FaRegUser />
          <input
            name="username"
            type="text"
            onChange={handleInputChanges}
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
          />
        </label>
        <p className="validator-hint hidden text-xs p-0 m-0">
          Must be 3 to 30 characters
          <br />containing only letters, numbers or dash
        </p>
        <label className="input validator outline-none w-full">
          <IoKeyOutline />
          <input
            name="password"
            onChange={handleInputChanges}
            type="password"
            required
            placeholder="Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <button className="btn btn-info text-white" onClick={handelLogin}>Login</button>
        <p className='textarea-md'>Don't have an account? <Link to='/signup' className='text-blue-700 hover:text-blue-400 underline'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login