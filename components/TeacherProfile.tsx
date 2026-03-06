
import { Mail, Briefcase, GraduationCap, MapPin, Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";

const TeacherProfile = ({ tutor }: { tutor: any }) => {
  if (!tutor) return <p>No profile data available.</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header / Banner Area */}
      <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700"></div>

      <div className="px-8 pb-8">
        <div className="relative flex justify-between items-end -mt-12">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
            {tutor.user?.image ? (
              <Image src={tutor.user.image} alt={tutor.user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-gray-400">{tutor.user?.name?.[0]}</span>
            )}
          </div>
          
          {/* Status Badge */}
          <div className="mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              tutor.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {tutor.status}
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900">{tutor.user?.name}</h2>
          <p className="text-indigo-600 font-medium capitalize">{tutor.designation}</p>
        </div>

        <hr className="my-6 border-gray-100" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <span>{tutor.user?.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <GraduationCap className="w-5 h-5 mr-3 text-gray-400" />
              <span>{tutor.degree}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
              <span>{tutor.experience} Year{tutor.experience !== "1" ? "s" : ""} Experience</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3 text-gray-400" />
              <span>{tutor.address || "No address provided"}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3 text-gray-400" />
              <span>Joined {new Date(tutor.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-5 h-5 mr-3 text-gray-400" />
              <span>{tutor.tutorSessions?.length || 0} Total Sessions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;