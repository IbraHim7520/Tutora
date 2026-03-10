/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import  { useEffect, useState } from 'react';
import { Trash2, PlusCircle, RotateCcw, ListTree, CheckCircle2, XCircle } from 'lucide-react';
import { ICategoryCreateForm } from '@/Interfaces/forms.interface';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import {  ICategoryData } from '@/Interfaces/data.interface';

const CategoryManagementPage = () => {
    const [loading , setLoading] = useState(false)
    const [categories, setAllCategories] = useState<ICategoryData[]>([]);
    const [countCategory , setCountCategory] = useState({
        totalCategories: 0,
        activeCategories: 0,
        inActiveCatgories: 0
    });
    const {handleSubmit , register , reset} = useForm<ICategoryCreateForm>()
    
    useEffect(()=>{
    const fetchCategory = async()=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/categories/all-categories`, {credentials: "include"});

        const cateData = await response.json();
        const {data} = cateData;
        if(cateData.success){
        setCountCategory(prevState => ({
            ...prevState,
            totalCategories: data.totalCategories,
            activeCategories: data.activeCategories,
            inActiveCatgories: data.inActiveCatgories
        }));
            
            setAllCategories(cateData.data.categories || []);
        }else{
            setAllCategories([])
        }
    }

    fetchCategory();
    },[])
    console.log("Count Category:",countCategory)


    const onSubmit = async(data:ICategoryCreateForm)=>{
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/categories/category/create`,{
            method: 'POST',
            headers:{
                 "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        const result = await response.json();
        if(result.success){
    const newCategory = result.data;

    setAllCategories(prev => [...prev, newCategory]);

    setCountCategory(prev => ({
        ...prev,
        totalCategories: prev.totalCategories + 1,
        activeCategories: prev.activeCategories + 1,
    }));

    reset();
    toast.success("Category Created!");
    setLoading(false)
}
        else{
            setLoading(false);
            toast.error("Failed to create category!");
            console.log(result)
        }
    }

    const handleReset = () => {
        reset();
    };

const toggleStatus = async (id: string) => {
  // 1️⃣ Get current category before changing
  const current = categories.find(cat => cat.id === id);
  if (!current) return;

  const newStatus = current.status === "ACTIVE" as string ? "INACTIVE" : "ACTIVE";

  // 2️⃣ Optimistic UI update
  setAllCategories(prev =>
    prev.map(cat =>
      cat.id === id ? { ...cat, status: newStatus } : cat
    )
  );

  // 3️⃣ Update counters immediately
  setCountCategory(prev => ({
    ...prev,
    activeCategories:
      newStatus === "ACTIVE"
        ? prev.activeCategories + 1
        : prev.activeCategories - 1,
    inActiveCatgories:
      newStatus === "INACTIVE"
        ? prev.inActiveCatgories + 1
        : prev.inActiveCatgories - 1,
  }));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/categories/${id}/toggle-status`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error("Failed");
    }

    toast.success("Status updated");
  } catch (error) {
    // 4️⃣ Rollback if API fails
    setAllCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, status: current.status } : cat
      )
    );

    setCountCategory(prev => ({
      ...prev,
      activeCategories:
        current.status === "ACTIVE" as string
          ? prev.activeCategories + 1
          : prev.activeCategories - 1,
      inActiveCatgories:
        current.status === "INACTIVE" as string
          ? prev.inActiveCatgories + 1
          : prev.inActiveCatgories - 1,
    }));

    toast.error("Failed to update status");
  }
};

const deleteCategory = async (id: string) => {
  const categoryToDelete = categories.find(cat => cat.id === id);
  if (!categoryToDelete) return;

  // 1️⃣ Optimistic remove from UI
  setAllCategories(prev => prev.filter(cat => cat.id !== id));

  // 2️⃣ Update counters immediately
  setCountCategory(prev => ({
    ...prev,
    totalCategories: prev.totalCategories - 1,
    activeCategories:
      categoryToDelete.status === "ACTIVE"
        ? prev.activeCategories - 1
        : prev.activeCategories,
    inActiveCatgories:
      categoryToDelete.status === "INACTIVE"
        ? prev.inActiveCatgories - 1
        : prev.inActiveCatgories,
  }));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/categories/category-delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error("Delete failed");
    }

    toast.success("Category deleted");
  } catch (error) {
    // 3️⃣ Rollback if failed
    setAllCategories(prev => [...prev, categoryToDelete]);

    setCountCategory(prev => ({
      ...prev,
      totalCategories: prev.totalCategories + 1,
      activeCategories:
        categoryToDelete.status === "ACTIVE" as string
          ? prev.activeCategories + 1
          : prev.activeCategories,
      inActiveCatgories:
        categoryToDelete.status === "INACTIVE" as string
          ? prev.inActiveCatgories + 1
          : prev.inActiveCatgories,
    }));

    toast.error("Failed to delete category");
  }
};
    // delete api: ${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/categories/category-delete/${id}
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* --- 1. Header & Stats Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-1">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Management</h1>
                        <p className="text-gray-500 font-medium">Control your store categories.</p>
                    </div>
                    
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                            <div className="p-3 bg-green-50 rounded-xl text-green-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Active</p>
                                <p className="text-2xl font-black text-gray-800">{countCategory.activeCategories}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                            <div className="p-3 bg-red-50 rounded-xl text-red-600">
                                <XCircle size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Inactive</p>
                                <p className="text-2xl font-black text-gray-800">{countCategory.inActiveCatgories}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. Form Section (Full Width) --- */}
                <section className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <PlusCircle className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Title</label>
                            <input 
                                type="text" 
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-700 placeholder:text-gray-300"
                                placeholder="Enter title..."
                                {...register("title")}
                                
                            />
                        </div>
                        <div className="md:col-span-5">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Description</label>
                            <input 
                                type="text" 
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-700 placeholder:text-gray-300"
                                placeholder="What's this category for?"
                                {...register("description")}
                            />
                        </div>
                        <div className="md:col-span-3 flex items-end gap-2">
                            <button 
                                type="submit" 
                                className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
                            >
                                {
                                    loading ? <Spinner className='size-6 mx-auto'/> : "Save"
                                }
                            </button>
                            <button 
                                type="button" 
                                onClick={handleReset}
                                className="p-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all"
                            >
                                <RotateCcw size={20} />
                            </button>
                        </div>
                    </form>
                </section>

                {/* --- 3. Table Section (Full Width) --- */}
                <section className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ListTree className="text-gray-400" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Category Registry</h2>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Category Details</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Created</th>
                                    <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {categories.map((category:ICategoryData, idx) => (
                                    <tr key={idx} className="group hover:bg-gray-50 transition-all">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-gray-800 text-lg leading-tight">{category.title}</p>
                                            <p className="text-sm text-gray-400 mt-1">Ref ID: CAT-{category.id.toString().slice(-4)}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                        type="checkbox"
                                        checked={category.status as string === "ACTIVE"}
                                        onChange={() => toggleStatus(category.id)}
                                        className="sr-only peer"
                                        />

                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
                                            rounded-full peer 
                                            peer-checked:bg-green-500 
                                            after:content-[''] after:absolute after:top-0.5 after:left-0.5
                                            after:bg-white after:border after:rounded-full 
                                            after:h-5 after:w-5 after:transition-all 
                                            peer-checked:after:translate-x-full">
                                        </div>

                                        <span className="ml-3 text-sm font-semibold text-gray-600">
                                        {category.status as string === "ACTIVE" ? "Active" : "Inactive"}
                                        </span>
                                    </label>
                                    </td>
                                        <td className="px-8 py-6 text-gray-500 font-semibold italic text-sm">
                                            {category.createdAt}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button 
                                               onClick={()=>deleteCategory(category.id)} 
                                                className="opacity-0 group-hover:opacity-100 p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {categories.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ListTree size={32} className="text-gray-200" />
                            </div>
                            <h3 className="text-gray-800 font-bold">No Records Found</h3>
                            <p className="text-gray-400 text-sm">Create your first category using the form above.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default CategoryManagementPage;