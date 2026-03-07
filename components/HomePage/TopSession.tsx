"use client"
import React, { useEffect, useState } from 'react';
import SessionCard from '@/components/SessionCard';
import { ISessionFetchedData } from '@/Interfaces/data.interface';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TopSession = () => {
    const [topSessions, setTopSessions] = useState<ISessionFetchedData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopSessions = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/sessions/all`);
                const result = await res.json();
                
                // Take only the first 8 sessions for the landing page
                const slicedData = (result.data || []).slice(0, 8);
                setTopSessions(slicedData);
            } catch (error) {
                console.error("Error fetching top sessions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopSessions();
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">
                            <Sparkles size={18} />
                            <span>Top Rated Sessions</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Learn from the best tutors <br className="hidden md:block" /> 
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                                tailored to your needs
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Join thousands of students in high-impact learning sessions. 
                            Boost your skills with our most popular classes this month.
                        </p>
                    </div>
                    
                    <Link 
                        href="/sessions" 
                        className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group"
                    >
                        View all sessions 
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : topSessions.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topSessions.map((session) => (
                            <SessionCard key={session.id} data={session} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed">
                        <p className="text-gray-500">No sessions available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopSession;