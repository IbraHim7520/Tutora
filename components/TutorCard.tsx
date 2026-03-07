import React from 'react';
import { GraduationCap, Briefcase, Mail, BookOpen, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// Using your interface logic
const TutorCard = ({ tutor }: { tutor: any }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Top Profile Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-indigo-50 overflow-hidden border border-indigo-100">
              {tutor.user.image ? (
                <img src={tutor.user.image} alt={tutor.user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {tutor.user.name[0]}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
            {tutor.designation}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {tutor.user.name}
        </h3>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <GraduationCap size={16} className="text-gray-400" />
            <span className="truncate">{tutor.degree}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <Briefcase size={16} className="text-gray-400" />
            <span>{tutor.experience} Years Experience</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <Mail size={16} className="text-gray-400" />
            <span className="truncate">{tutor.user.email}</span>
          </div>
        </div>
      </div>

      {/* Stats & Action */}
      <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen size={16} />
          <span className="text-xs font-semibold">{tutor.tutorSessions?.length || 0} Sessions</span>
        </div>
        
        <Link 
          href={`/tutors/${tutor.id}/sessions`} 
          className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-all"
        >
          View Sessions
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;