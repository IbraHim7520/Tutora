export interface ICategory {
    categories: {
        id:string,
    title:string,
    description:string,
    createdAt:string,
    updatedAt:string
    }[],
    totalCategories:string
    activeCategories:string
    inActiveCatgories:string
}
export interface ICategoriesData {
    id:string,
    title:string,
    description:string,
    createdAt:string,
    updatedAt:string
}   
export interface ICategoryGeneral {
    id:string,
    title:string,
    description:string,
    createdAt:string,
    updatedAt:string
}

export interface ISessionCreate {
    title: string,
    description:string,
    date:string,
    fromTime:string,
    toTime:string,
    categoryId:string,
    sessionFee:number
    tutorId:string
}

export interface ISessionData{
    bookings: Record<string, unknown>[],
    category: {
        id:string,
        title:string
    },
    categoryId:string,
    createdAt:string,
    date:string,
    description:string,
    fromTime:string,
    id:string,
    status:"APPROVED" | "DISCONTINUE" | "BANNED",
    sessionFee:number,
    title:string,
    toTime:string,
    tutorId:string,
    updatedAt:string
}

export interface ICategoryData {
    id:string,
    title:string,
    status: "ACTIVE" | "INACTIVE",
    description:string,
    createdAt:string,
    updatedAt:string
}


export interface IUser {
  email: string;
  name: string;
  image: string;
}

export interface ITutor {
  degree: string;
  designation: string;
  experience: string;
  isBanned: boolean;
  user: IUser;
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
}

export interface ISessionFetchedData {
  id: string;
  title: string;
  description: string;
  sessionFee: number;
  status: "APPROVED" | "PENDING" | "REJECTED"; // Added common status types
  date: string; // ISO Date String
  fromTime: string; // ISO Date String
  toTime: string; // ISO Date String
  categoryId: string;
  category: ICategory;
  tutorId: string;
  tutor: ITutor;
  createdAt: string;
  updatedAt: string;
}