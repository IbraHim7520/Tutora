"use client";

import React, { useEffect, useState } from "react";
import { Users, Search, SlidersHorizontal } from "lucide-react";
import TutorCard from "@/components/TutorCard";

const TutorPage = () => {
  const [allTutors, setAllTutors] = useState<any[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutors/tutor/all-tutors`,
          { cache: "no-store" , credentials: "include" },
          
        );

        const text = await response.text();
        let result: any = {};

        try {
          result = JSON.parse(text);
        } catch {
          result = {};
        }

        const data = Array.isArray(result?.data) ? result.data : [];
        setAllTutors(data);
        setFilteredTutors(data);
      } catch {
        setAllTutors([]);
        setFilteredTutors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = allTutors.filter((tutor) => {
      const nameMatch = tutor?.user?.name?.toLowerCase?.().includes(query);
      const degreeMatch = tutor?.degree?.toLowerCase?.().includes(query);
      const designationMatch = tutor?.designation?.toLowerCase?.().includes(query);
      return nameMatch || degreeMatch || designationMatch;
    });

    setFilteredTutors(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-xl text-indigo-600 mb-4">
            <Users size={24} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Expert Tutors
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Connect with verified lecturers and industry professionals to accelerate your learning journey.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name, degree, or position..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <p className="text-sm text-gray-500 hidden md:block">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredTutors.length}
              </span>{" "}
              tutors
            </p>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all ml-auto">
              <SlidersHorizontal size={18} />
              Filter
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor?.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Search size={32} className="text-gray-300" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              No tutors found
            </h3>

            <p className="text-gray-500 max-w-xs mx-auto mt-1">
              We couldn't find any tutors matching "{searchQuery}". Try a different search term.
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setFilteredTutors(allTutors);
              }}
              className="mt-4 text-indigo-600 font-semibold text-sm hover:underline"
            >
              Clear all searches
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TutorPage;