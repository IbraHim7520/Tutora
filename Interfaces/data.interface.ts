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