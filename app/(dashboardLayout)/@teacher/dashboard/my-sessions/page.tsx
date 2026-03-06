"use client";

import SessionRow from "@/components/SessionRow";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { ICategoriesData, ISessionData } from "@/Interfaces/data.interface";
import { ISessionUpateFormData } from "@/Interfaces/forms.interface";

import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";

const MySessionPage = () => {
  const [categories, setCategories] = useState<ICategoriesData[]>([]);
  const [sessionData, setSessionData] = useState<ISessionData[]>([]);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<ISessionUpateFormData>();

  /* ---------------- DERIVED STATS ---------------- */
  const stats = useMemo(() => {
    return {
      total: sessionData.length,
      approved: sessionData.filter((s) => s.status === "APPROVED").length,
      discontinued: sessionData.filter((s) => s.status === "DISCONTINUE").length,
    };
  }, [sessionData]);

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/categories/category/all-category/general`, {credentials: 'include'}
        );
        const data = await response.json();
        setCategories(data.success ? data.data : []);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);
  console.log(categories)
  /* ---------------- FETCH SESSIONS ---------------- */
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setSessionLoading(true);
        const sessionRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/tutor-sessions`,
          { credentials: "include" }
        );
        if (!sessionRes.ok) {
          toast.error("Internet problem!");
          return;
        }
        const result = await sessionRes.json();
        setSessionData(result.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Could not load sessions.");
        setSessionData([]);
      } finally {
        setSessionLoading(false);
      }
    };
    fetchSessionData();
  }, []);

  /* ---------------- HANDLERS ---------------- */
 const handleSessionReschedule = (session: ISessionData) => {
  setSessionId(session.id);

  // Format date properly (yyyy-mm-dd)
  const formattedDate = new Date(session.date)
    .toISOString()
    .split("T")[0];

  // Format time properly (HH:mm)
  const formattedFromTime = new Date(session.fromTime)
    .toISOString()
    .slice(11, 16);

  const formattedToTime = new Date(session.toTime)
    .toISOString()
    .slice(11, 16);

  setValue("title", session.title);
  setValue("categoryId", session.categoryId);
  setValue("date", formattedDate);
  setValue("fromTime", formattedFromTime);
  setValue("toTime", formattedToTime);

  setIsUpdateOpen(true);
};

  const handleSessionDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/session-delete/${id}`, {
            method: "DELETE",
            credentials: "include",
          });
          const data = await res.json();
          if (data.success) {
            toast.success("Session deleted");
            setSessionData((prev) => prev.filter((s) => s.id !== id));
          }
        } catch {
          toast.error("Deletion error");
        }
      }
    });
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "APPROVED" ? "DISCONTINUE" : "APPROVED";
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/session/toggle/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setSessionData((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
        toast.success(`Session ${newStatus}`);
        console.log(result)
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ---------------- UPDATE FORM ---------------- */
const onSubmit = async (formData: ISessionUpateFormData) => {
  if (!sessionId) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/session-update/${sessionId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();
    console.log(result)
    if (!result.success) {
      toast.error("Update failed");
      return;
    }

    toast.success("Session updated successfully");

    // 🔥 Optimistic Local Update
    setSessionData((prev) =>
      prev.map((session) => {
        if (session.id !== sessionId) return session;

        // Find updated category object
        const updatedCategory = categories.find(
          (c) => c.id === formData.categoryId
        );

        return {
          ...session,
          ...formData,
          category: updatedCategory
            ? { ...updatedCategory }
            : session.category,
        };
      })
    );

    setIsUpdateOpen(false);
    reset();
    setSessionId(null);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};

  

  return (
    <div className="container mx-auto py-10 px-4">
      {/* ---------------- HEADER & STATS ---------------- */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Tutoring Sessions</h1>
        <p className="text-gray-500">Manage and track your teaching schedule</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Total Sessions</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <p className="text-sm text-green-600 font-medium">Approved</p>
            <p className="text-2xl font-bold">{stats.approved}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <p className="text-sm text-red-600 font-medium">Discontinued</p>
            <p className="text-2xl font-bold">{stats.discontinued}</p>
          </div>
        </div>
      </div>

      {/* ---------------- UPDATE DIALOG ---------------- */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>Update Session</DialogTitle>
            <DialogDescription>Modify details for this session.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Session Title</label>
              <input {...register("title")} className="border p-2 rounded-md w-full" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Category</label>
              <select {...register("categoryId")} className="border p-2 rounded-md w-full">
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Date</label>
              <input {...register("date")} type="date" className="border p-2 rounded-md w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">From</label>
                <input {...register("fromTime")} type="time" className="border p-2 rounded-md w-full" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">To</label>
                <input {...register("toTime")} type="time" className="border p-2 rounded-md w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => setIsUpdateOpen(false)}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto bg-white rounded-xl border shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-sm">Session Info</th>
              <th className="p-4 font-semibold text-sm">Category</th>
              <th className="p-4 font-semibold text-sm">Schedule</th>
              <th className="p-4 font-semibold text-sm text-center">Status</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessionLoading ? (
              <tr>
                <td colSpan={5} className="py-20 text-center mx-auto w-full h-full"><Spinner /></td>
              </tr>
            ) : sessionData.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center text-gray-400">No sessions found.</td>
              </tr>
            ) : (
              sessionData.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  handleSessionDelete={handleSessionDelete}
                  handlSessionSchedule={() => handleSessionReschedule(session)}
                  handleStatusToggle={handleStatusToggle}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySessionPage;