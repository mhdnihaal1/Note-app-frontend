import React from 'react'
import { getInitails } from '../../utils/Helper'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div
      className="
        flex items-center gap-3 sm:gap-4 
        p-3 sm:p-4 rounded-lg shadow-md bg-white 
        w-[70%] max-w-sm  
      "
    >

      <div className="
        relative w-12 h-12 sm:w-17 sm:h-14 
        flex items-center justify-center 
        rounded-full bg-gradient-to-br from-blue-500 to-blue-700 
        text-white font-semibold text-base sm:text-lg shadow-md
      ">
        {getInitails(userInfo?.fullName)}
      </div>

      {/* User Information */}
      <div className="flex flex-col">
        <p className="text-sm sm:text-base font-semibold text-slate-900">
          {userInfo?.fullName}
        </p>
        <button
          className="mt-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
