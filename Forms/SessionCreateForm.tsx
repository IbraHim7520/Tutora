/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import { Spinner } from "@/components/ui/spinner";
import { ICategoryGeneral, ISessionCreate } from "@/Interfaces/data.interface";
import { UserSession } from "@/Utils/clientSideSession";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const SessionCreateForm = () => {
  const { register, reset, handleSubmit } = useForm<ISessionCreate>()
  const [sesionFee, setSessionFee] = useState("");
  const [tutorData, setTutorData] = useState(null);
  const { user, isPending } = UserSession()
 
  const [loading, setLoadin] = useState(false)
  const [categories, setCategories] = useState<ICategoryGeneral[]>([]);

  useEffect(() => {
    async function fetchCategorie() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/categories/category/all-category/general`,{credentials: 'include'});
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setCategories(data.data)
      } else {
        setCategories([])
      }
    }
    fetchCategorie()
  }, [])

  // useEffect(() => {
  //   if (!user?.id) return;

  //   const getTutorProfile = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutors/tutor/${user.id}`);
  //       const profileData = await res.json();
  //       if (profileData.success) {
  //         setTutorData(profileData.data);
  //       } else {
  //         setTutorData(null);
  //         toast.error("Invalid Tutor Id!");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Failed to fetch tutor profile!");
  //     }
  //   };

  //   getTutorProfile();
  // }, [user?.id]);


  const handleSessionFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return setSessionFee("");
    if (Number(value) >= 0) setSessionFee(value);
  };

  const onSubmit = async (data: ISessionCreate) => {
    
    setLoadin(true)
    data.sessionFee = parseFloat(sesionFee);
    
    data.tutorId = user.id;

    if (!data.categoryId) {
      return toast.error("Please select a category!");
    } else if (!data.sessionFee) {
      return toast.error("Session Fee is required!");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/session-create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    const result = await response.json();
    if (result.success) {
      reset();
      setLoadin(false);
      toast.success(result.message);
    } else {
      setLoadin(false);
      toast.error(result.message)
    }

  }

  return (
    <div className="max-w-full mx-auto bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
        <h2 className="text-3xl font-extrabold tracking-tight">Schedule a New Session</h2>
        <p className="mt-2 text-blue-100 opacity-90">
          Set up your tutoring availability and share your expertise with the community.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">

        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-600 rounded-full text-sm">1</span>
            General Information
          </h3>
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Session Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                required
                placeholder="Ex: Master the Fundamentals of React Hooks"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Session Summary</label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                required
                placeholder="What will your students achieve by the end of this session?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Section 2: Logistics */}
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-600 rounded-full text-sm">2</span>
            Date & Availability
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Meeting Date</label>
              <input required {...register("date", { required: true })} type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Start Time</label>
              <input required {...register("fromTime", { required: true })} type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">End Time</label>
              <input required {...register("toTime", { required: true })} type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Section 3: Pricing & Category */}
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-600 rounded-full text-sm">3</span>
            Classification & Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Topic Category</label>
              <select required {...register("categoryId", { required: true })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer">
                {
                  categories.map((category, idx) => <option key={idx} value={category.id}>{category.title}</option>)
                }
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600 ml-1">Session Fee (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input

                  onChange={(e) => handleSessionFeeChange(e)}
                  value={sesionFee}
                  required
                  type="number"
                  min={"0"}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 flex justify-center items-center hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 ease-in-out shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
          >
            {loading ? <Spinner className="size-6"></Spinner> : " Publish Session"}
          </button>
          <button
            onClick={() => { reset(); setSessionFee("") }}
            type="button"
            className="px-8 py-4 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition duration-200"
          >
            Clear
          </button>
        </div>
        <p className="text-center text-xs text-gray-400">
          By publishing, you agree to the tutor terms of service and session guidelines.
        </p>
      </form>
    </div>
  );
};

export default SessionCreateForm;