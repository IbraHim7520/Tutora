"use client"
import { Search, Filter, BookOpen } from 'lucide-react';
import SessionCard from '@/components/SessionCard';
import { ISessionFetchedData } from '@/Interfaces/data.interface';
import { useEffect, useState } from 'react';

const SessionPage = () => {
    const [allSessions, setAllSessions] = useState<ISessionFetchedData[]>([]);
    const [filteredSessions, setFilteredSessions] = useState<ISessionFetchedData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Correct way to call async inside useEffect
        const fetchSessions = async () => {
            try {
                setIsLoading(true);
                const SRes = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/sessions/all`);
                const SData = await SRes.json();
                const sessions = SData.data || [];
                setAllSessions(sessions);
                setFilteredSessions(sessions);
            } catch (error) {
                console.error("Failed to fetch sessions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const handleSessionSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        
        const filtered = allSessions.filter((session) => 
            session.title.toLowerCase().includes(query) || 
            session.description.toLowerCase().includes(query) ||
            session.tutor?.user?.name.toLowerCase().includes(query)
        );

        setFilteredSessions(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Explore Sessions</h1>
                            <p className="text-gray-500 mt-1">
                                Found <span className="text-indigo-600 font-semibold">{filteredSessions.length}</span> tutoring sessions.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    onChange={handleSessionSearch}
                                    placeholder="Search by title, tutor, or info..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl text-sm transition-all outline-none"
                                />
                            </div>
                            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                <Filter size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {isLoading ? (
                    /* Basic Loading State (or use your Skeleton here) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-64 bg-gray-200 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : filteredSessions.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredSessions.map((session) => (
                            <SessionCard key={session.id} data={session} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                            <BookOpen size={48} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">No sessions found</h3>
                        <p className="text-gray-400">Try adjusting your search terms.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SessionPage;