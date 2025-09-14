import  { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import {validateEmail} from '../../utils/Helper'
import axiosInstance from '../../utils/axiosInstance'
import toast from "react-hot-toast";



const SignUp = () => {

  const [name , setName] = useState('')
  const [email, setEmail] = useState('')
  const [password , setPassword] =  useState('')
  const [error , setError] = useState(null)
   const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const handleSignUp = async (e)=>{
   e.preventDefault();

 
   if(!name){
    setError('Please enter your name...')
    return;
  }
   if(!validateEmail(email)){
     setError('Please enter a valid email address...')
     return;
   }
     if(!password){
       setError('Please enter  password...');
       return;
     }
   setError('')
   setShowOtpModal(true);

    try{
  console.log(email)
     const response = await axiosInstance.post('/send-otp',{
       email:email,
     })
   if(response?.data?.success == true){
     toast.success("Otp sended successfully");

  }

   }catch(error){
    console.log(error)
    if(error.response && error.response.data && error.response.data.message){
      setError(error.response.data.message)
    }else{
      setError('An unexpected error occured. Please try again')
    }
   }
  }

  const verifyOtpSubmit = async() => {
try{
 
   const res = await axiosInstance.post('/verify-otp',{
       email:email,
      otp:otp,
    })
console.log(1313,res);
 
setOtp("");
    if(res.data?.success == true){
   const response = await axiosInstance.post('/create-account',{
      fullName:name,
      email:email,
      password:password,
    })
 
    if(response.data && response.data.accessToken){
    localStorage.setItem('token',response.data.accessToken)
    navigate('/')
  }

    }else{
      console.log(123,"on error");
      toast.error("❌ Wrong OTP entered!");

    }

 
   }catch(error){
    console.log(error)
    if(error.response && error.response.data && error.response.data.message){
      setError(error.response.data.message)
    }else{
      setError('An unexpected error occured. Please try again')
    }
   }
 
  }
 

  return (
     <>
<div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Centered Signup Box */}
      <div className="flex items-center justify-center px-4 py-10">
        <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Left Section - Form */}
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12">
            <h4 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Create an Account
            </h4>
            <p className="text-sm text-gray-500 text-center mb-8">
              Join us today and get started 🚀
            </p>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name */}
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Email */}
              <input
                type="text"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Error */}
              {error && <p className="text-red-500 text-xs">{error}</p>}

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg 
                           hover:bg-blue-700 transition-all duration-200 shadow-md"
              >
                Sign Up
              </button>
            </form>

            {/* Footer */}
            <p className="text-sm text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="hidden md:block w-1/2">
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
              alt="Signup illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50">
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-96 border border-gray-700 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-center text-green-400">
              🔑 Verify Your OTP
            </h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-600 bg-gray-800 text-white rounded-lg p-3 w-full mb-5 
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <div className="flex justify-between gap-3">
              <button
                className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500 
                           transition duration-200 shadow-lg hover:shadow-green-500/50"
                onClick={() => verifyOtpSubmit(otp)}
              >
                Verify
              </button>
            </div>

            <span className="text-xs flex justify-center text-gray-400 italic mt-3">
              ⚠️ Going back now could cancel your signup.
            </span>
          </div>
        </div>
      )}
    </div>  </>

  )
}

export default SignUp
