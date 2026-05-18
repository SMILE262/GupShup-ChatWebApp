import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { registerUserThunk } from '../../store/slice/user/userThunk';
import toast from 'react-hot-toast';

const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.userReducer)
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated])

  const handleInputChanges = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handelSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and confirm password do not match")
    }
    const response = await dispatch(registerUserThunk(signupData))
    if (response?.payload?.success) {
      navigate("/")
    }
  }

  return (
    <div className='flex justify-center p-5  min-h-screen items-center'>
      <div className='flex flex-col bg-base-300 p-5 gap-5 rounded max-w-160 w-full'>
        <h3 className='text-2xl font-semibold'> Please Signup...!</h3>
        <label className="input validator outline-none w-full">
          <MdDriveFileRenameOutline />
          <input
            name="fullName"
            type="text"
            required
            placeholder="FullName"
            pattern="[A-Za-z][A-Za-z\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters"
            onChange={handleInputChanges}
          />
        </label>
        <label className="input validator outline-none w-full">
          <FaRegUser />
          <input
            name="username"
            type="text"
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            onChange={handleInputChanges}
          />
        </label>
        <label className="input validator outline-none w-full">
          <IoKeyOutline />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            onChange={handleInputChanges}
          />
        </label>
        <label className="input validator outline-none w-full">
          <IoKeyOutline />
          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            onChange={handleInputChanges}
          />
        </label>
        <div className='flex mx-2 gap-4'>
          <label htmlFor="male" className='flex gap-2'>
            <input
              id="male"
              value="male"
              type="radio"
              name="gender"
              className="radio radio-info items-center"
              onChange={handleInputChanges} />
            Male
          </label>
          <label htmlFor="female" className='flex gap-2'>
            <input
              id="female"
              value="female"
              type="radio"
              name="gender"
              className="radio radio-info "
              onChange={handleInputChanges} />
            Female
          </label>
        </div>
        <button onClick={handelSignup} className="btn btn-info text-white">Sign Up</button>
        <p className='textarea-md'>Already have an account? <Link to='/login' className='text-blue-700 hover:text-blue-400 underline'>Login</Link></p>
      </div>
    </div>
  )
}

export default Signup