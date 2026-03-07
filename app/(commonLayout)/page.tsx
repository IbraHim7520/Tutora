import WhyChooseUs from "@/components/HomePage/ChooseUs";
import TeacherHighlight from "@/components/HomePage/ExpartTeacher";
import HomeBanner from "@/components/HomePage/HomeBanner";
import HomePageScroller from "@/components/HomePage/HomePageScroller";
import TopSession from "@/components/HomePage/TopSession";

export default function Home() {
  return (
    <div>
      <HomeBanner/>
      <HomePageScroller></HomePageScroller>
      <TopSession/>
      <TeacherHighlight />
      <WhyChooseUs />
    </div>
  );
}
