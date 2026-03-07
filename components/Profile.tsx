import React from 'react';

const Profile = ({ user }: {user: any}) => {
  // Assuming 'user' prop contains name, email, bio, avatar, and stats
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Profile Header/Cover Gradient */}
      <div className="h-32 bg-linear-to-r from-indigo-500 to-blue-600"></div>

      <div className="px-8 pb-8">
        <div className="relative flex justify-between items-end -mt-12 mb-6">
          {/* Avatar */}
          <div className="p-1 bg-white rounded-2xl">
            <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden border-4 border-white shadow-md">
              <img 
                src={user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Action Button */}
          <button className="px-5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name || "Loading..."}</h2>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
              Verified Tutor
            </span>
          </div>
          <p className="text-gray-500 font-medium">{user?.email || "tutor@example.com"}</p>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-2xl">
          {user?.bio || "Expert educator specializing in modern web technologies. Helping students bridge the gap between theory and industry-standard practices."}
        </p>

        {/* Dashboard Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-y border-gray-50">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{user?.totalSessions || 0}</div>
            <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Sessions</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-xl font-bold text-gray-900">{user?.totalStudents || 0}</div>
            <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Students</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">★ {user?.rating || "0.0"}</div>
            <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Rating</div>
          </div>
        </div>

        {/* Meta Info (Join Date, Category) */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Remote / Online
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;