import { Target, ShieldCheck, Zap, Globe } from 'lucide-react';
import Image from 'next/image';

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Result Oriented",
      text: "95% of our students report grade improvements within the first 3 months.",
      icon: <Target className="text-indigo-600" />
    },
    {
      title: "Safe & Secure",
      text: "Encrypted payments and verified tutor backgrounds for your peace of mind.",
      icon: <ShieldCheck className="text-indigo-600" />
    },
    {
      title: "Instant Access",
      text: "No waitlists. Browse, book, and start learning in minutes.",
      icon: <Zap className="text-indigo-600" />
    },
    {
      title: "Global Community",
      text: "Learn from experts worldwide, anytime that fits your schedule.",
      icon: <Globe className="text-indigo-600" />
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Visual Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 bg-indigo-600 rounded-3xl flex items-center justify-center p-8 text-white">
                  <div>
                    <p className="text-5xl font-bold mb-2">15k+</p>
                    <p className="text-indigo-100 font-medium">Active Students</p>
                  </div>
                </div>
                <Image width={200} height={200} priority quality={100} src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&fit=crop" className="h-48 w-full object-cover rounded-3xl" alt="Study Group" ></Image>
              </div>
              <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1523240715639-99a80840c80d?w=400&fit=crop" className="h-48 w-full object-cover rounded-3xl" alt="Laptop" />
                <div className="h-64 bg-white rounded-3xl shadow-xl flex items-center justify-center p-8 border border-gray-100">
                   <div>
                    <p className="text-5xl font-bold text-gray-900 mb-2">98%</p>
                    <p className="text-gray-500 font-medium">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Benefits */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
              Why thousands of students <br />
              <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">trust our platform</span>
            </h2>
            
            <div className="space-y-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{b.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs