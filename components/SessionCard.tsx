"use client"
import { Calendar, Clock, Timer, Users, Star, ArrowRight } from "lucide-react";
import { ISessionFetchedData } from "@/Interfaces/data.interface";

const SessionCard = ({ data }: { data: ISessionFetchedData }) => {
  
  // Helper to format ISO Date to readable string
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };


  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate Duration from ISO strings
  const getDuration = (from: string, to: string) => {
    const start = new Date(from);
    const end = new Date(to);
    const diff = Math.abs(end.getTime() - start.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
  };
  const handleSessionBook = (sessionId:string)=>{
    alert(sessionId)
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Header: Title & Rating */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
            {data.title}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-700">4.5</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-6 grow">
          {data.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
          <div className="flex items-center text-gray-600 gap-2">
            <Calendar size={16} className="text-indigo-500" />
            <span className="text-xs font-medium">{formatDate(data.date)}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2">
            <Timer size={16} className="text-indigo-500" />
            <span className="text-xs font-medium">{getDuration(data.fromTime, data.toTime)}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2">
            <Clock size={16} className="text-indigo-500" />
            <span className="text-xs font-medium uppercase whitespace-nowrap">
              {formatTime(data.fromTime)}
            </span>
          </div>
          <div className="flex items-center text-gray-600 gap-2">
            <Users size={16} className="text-indigo-500" />
            <span className="text-xs font-medium">Free</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-lg font-bold text-indigo-600">${data.sessionFee}</span>
            <button onClick={()=>handleSessionBook(data.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 group">
            Book
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;