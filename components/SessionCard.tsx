"use client"
import { Calendar, Clock, Timer, Users, Star } from "lucide-react";
import { ISessionFetchedData } from "@/Interfaces/data.interface";
import { UserSession } from "@/Utils/clientSideSession";
import Swal from "sweetalert2";
import ReviewModal from "./ReviewModalBox";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SessionCard = ({ data , isBooked}: { data: ISessionFetchedData, isBooked: boolean }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {user} = UserSession()

  const handleReviewSubmit = async (rating: number, comment: string) => {
      console.log("Submitting to API:", { sessionId: data.id, rating, comment });
      setIsModalOpen(false);
  };

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

  const getDuration = (from: string, to: string) => {
    const start = new Date(from);
    const end = new Date(to);
    const diff = Math.abs(end.getTime() - start.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
  };

  const handleSessionBook = async (sessionId:string)=>{

    if(!user?.id) {
      toast.error("Please login before book a session.");
      router.push("/login")
      return
    }

    const bookingData = {
      userId:user.id,
      categoryId: data.categoryId,
      tutorSessionId: sessionId
    }

    Swal.fire({
      title: "Do you want to book the session??",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async(result) => {

      if (result.isConfirmed) {

        const bookingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/bookings/booking/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
          cache: 'no-store',
          credentials: "include"
        })

        const resultData = await bookingResponse.json();

        if(resultData.success){
          Swal.fire("Booked!", "", "success");
        }else{
          Swal.fire(resultData.message , "error")
        }
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">

      <div className="p-6 flex flex-col h-full">

        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
            {data.title}
          </h3>

          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-700">4.5</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-6 grow">
          {data.description}
        </p>

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
      </div>

      <div className="mt-6">

        {isBooked ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl hover:bg-emerald-600 hover:text-white transition-all text-sm font-semibold"
          >
            Give Review
          </button>
        ) : (
          <button
            onClick={()=>handleSessionBook(data.id)}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-semibold"
          >
            Book Now
          </button>
        )}

      </div>

      {user && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sessionTitle={data.title}
          userId={user.id}
          sessionId={data.id}
          onSubmit={handleReviewSubmit}
        />
      )}

    </div>
  );
};

export default SessionCard;