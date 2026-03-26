import React, { useContext, useState } from 'react'
import axios from "axios"
import bg from "../assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext.js';

function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const {serverUrl,userData, setUserData} = useContext(UserDataContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSignIn = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try{
            let result = await axios.post(`${serverUrl}/api/auth/signin`, {email, password
            }, {withCredentials:true} )
            setUserData(result.data)
            setLoading(false)
            navigate("/")
        }catch(error){
            console.log(error)
            setUserData(null)
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <div 
          className='w-full h-screen bg-cover flex justify-center items-center' 
          style={{ backgroundImage: `url(${bg})` }}
        >
            <form 
              onSubmit={handleSignIn}
              className='w-[90%] h-150 max-w-125 bg-[#00000062] backdrop-blur shadow-black flex flex-col items-center justify-center gap-5 px-5'
            >
                <h1 className='text-white text-[30px] font-semibold mb-7.5'>
                    Sign In to <span className='text-blue-400'>Virtual Assistant</span>
                </h1>

                <input
                    type='email'
                    placeholder='Email'
                    className='w-full h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <div className='relative w-full h-15 border-2 border-white bg-transparent text-white rounded-full text-[18px]'>

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        className='w-full h-full outline-none bg-transparent placeholder-gray-300 px-5 py-2.5'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    {!showPassword ? (
                        <IoEye
                            className='absolute top-4.5 right-5 w-6 h-6 text-white cursor-pointer'
                            onClick={() => setShowPassword(true)}
                        />
                    ) : (
                        <IoEyeOff
                            className='absolute top-4.5 right-5 w-6 h-6 text-white cursor-pointer'
                            onClick={() => setShowPassword(false)}
                        />
                    )}
                </div>
                {error.length > 0 && <p className='text-red-500 text-17px'>
                        *{error}
                    </p>
                }

                <button
                    type="submit"
                    className='min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white rounded-full text-[19px]' disabled={loading}
                >
                    {loading?"Loading":"Sign In"}
                </button>

                <p
                    className='text-white text-[18px] cursor-pointer'
                    onClick={() => navigate("/signup")}
                >
                    Want to create a new account? <span className='text-blue-400'>Sign Up</span>
                </p>
            </form>
        </div>
    )
}

export default SignIn