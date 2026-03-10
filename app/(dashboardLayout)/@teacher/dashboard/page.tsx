import TeacherProfile from "@/components/TeacherProfile";
import { cookies } from "next/headers";

const DashboardPage = async () => {

  const cookieStore =await cookies();

  const tutorResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutors/profile`,
    {
      headers: {
        cookie: cookieStore.toString()
      },
      cache: "no-store",
      credentials: 'include'
    }
  );

  const tutorData = await tutorResponse.json();

  console.log("Tutor Data:", tutorData);

  return (
<div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Profile Information</h3>
      {/* Pass the 'data' object specifically */}
      <TeacherProfile tutor={tutorData.data} />
    </div>
  </div>
  );
};

export default DashboardPage;