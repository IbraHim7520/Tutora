import { ISessionData } from "@/Interfaces/data.interface";
import Link from "next/link";

interface SessionRowProps {
  session: ISessionData;
  handleSessionDelete: (sessionId: string) => void;
  handlSessionSchedule: (session: ISessionData) => void; // Changed to take full session for easier form pre-fill
  handleStatusToggle: (sessionId: string, currentStatus: string) => void;
}

const SessionRow = ({
  session,
  handleSessionDelete,
  handlSessionSchedule,
  handleStatusToggle,
}: SessionRowProps) => {
  // Logic for duration
  const start = new Date(session.fromTime);
  const end = new Date(session.toTime);
  const durationMs = end.getTime() - start.getTime();
  const durationMinutes = Math.max(0, Math.floor(durationMs / 60000));

  return (
    <tr className="hover:bg-gray-50/50 transition-colors border-b last:border-0">
      {/* 1. Session Info */}
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{session.title}</p>
        <p className="text-xs text-gray-500 truncate max-w-50">
          {session.description || "No description provided"}
        </p>
      </td>

      {/* 2. Category */}
      <td className="px-6 py-4">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {session.category?.title || "Uncategorized"}
        </span>
      </td>

      {/* 3. Schedule */}
      <td className="px-6 py-4 text-sm text-gray-600">
        <div className="flex flex-col">
          <span className="font-medium">
            {new Date(session.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-xs text-blue-600">
            {new Date(session.fromTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {durationMinutes}m
          </span>
        </div>
      </td>

      {/* 4. Status Toggle */}
      {/* 4. Status Toggle */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          {/** Correct Status Check */}
          {(() => {
            const isApproved = session.status === "APPROVED";

            return (
              <>
                <span
                  className={`text-[10px] font-bold uppercase ${
                    isApproved ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {isApproved ? "Approved" : "Discontinue"}
                </span>

                <button
                  onClick={() =>
                    handleStatusToggle(session.id, session.status)
                  }
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                    isApproved ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      isApproved ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </>
            );
          })()}
        </div>
      </td>

      {/* 5. Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-1">
          <Link
            href={`/dashboard/my-sessions/bookings/${session.id}`}
            title="View Bookings"
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <span className="text-xs font-bold uppercase tracking-wider">Bookings</span>
          </Link>
          
          <button
            onClick={() => handlSessionSchedule(session)}
            title="Update"
            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>

          <button
            onClick={() => handleSessionDelete(session.id)}
            title="Delete"
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SessionRow;