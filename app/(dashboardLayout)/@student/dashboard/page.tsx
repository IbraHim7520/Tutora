import StudentProfile from "@/components/StudentProfile";
import { cookies } from "next/headers";

const page = async() => {
    const cookiesData = await cookies();
    const userProfileResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/users/profile`,{
        headers:{
            cookie: cookiesData.toString()
        },cache: 'no-store', credentials: "include"
    })

    const userProfileData = await userProfileResponse.json();
    console.log(userProfileData)
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Profile Information</h3>
      {/* Pass the 'data' object specifically */}
      <StudentProfile student={userProfileData.data}/>
    </div>
  </div>
    );
};

export default page;