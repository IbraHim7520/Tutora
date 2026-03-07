import React from 'react';
import { Award, CheckCircle, Star } from 'lucide-react';

const TeacherHighlight = () => {
  const teachers = [
    {
      name: "Dr. Sarah Chen",
      role: "Senior Mathematics Tutor",
      specialty: "Calculus & Linear Algebra",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      badge: "PhD Holder"
    },
    {
      name: "Prof. James Wilson",
      role: "Physics Specialist",
      specialty: "Quantum Mechanics & Optics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      badge: "10+ Yrs Exp"
    },
    {
      name: "Ibrahim Al-Sayed",
      role: "CSE Lecturer",
      specialty: "Data Structures & Algorithms",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      badge: "Industry Pro"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Elite Faculty</h2>
          <h3 className="text-4xl font-extrabold text-gray-900">Learn from Industry Leaders</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teachers.map((t, i) => (
            <div key={i} className="group relative">
              <div className="relative h-96 w-full overflow-hidden rounded-3xl">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t.badge}
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-2">{t.name}</h4>
                  <p className="text-indigo-200 text-sm">{t.role}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-2">
                <p className="text-gray-500 text-sm font-medium">{t.specialty}</p>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">4.9</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherHighlight