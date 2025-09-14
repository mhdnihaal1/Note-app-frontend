import  { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import {validateEmail} from '../../utils/Helper'
import axiosInstance from '../../utils/axiosInstance'


const Login = () => {

     const [email, setEmail] = useState('')
     const [password , setPassword] =  useState('')
     const [error , setError] = useState(null)

     const navigate = useNavigate()

     const handleLogin = async (e)=>{
      e.preventDefault();
    
      if(!validateEmail(email)){
        setError('Please enter a valid email address...')
        return;
      }
        if(!password){
          setError('Please enter a valid password.');
          return;
        }
      setError('')

//        Login API call
         try{
          const response = await axiosInstance.post('/login',{
            email:email,
            password:password,
          })

          if(response.data && response.data.accessToken){
            localStorage.setItem("token",response.data.accessToken)
            navigate('/')
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
  return <>
 <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Centered Login Box */}
      <div className="flex items-center justify-center px-4 py-10">
        <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Left Section - Login Form */}
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12">
            <h4 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Welcome Back
            </h4>
            <p className="text-sm text-gray-500 text-center mb-8">
              Login to access your account
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
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

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg 
                           hover:bg-blue-700 transition-all duration-200 shadow-md"
              >
                Login
              </button>
            </form>

            {/* Footer */}
            <p className="text-sm text-center mt-6 text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="hidden md:block w-1/2">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Login illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

  </>


}
export default Login
