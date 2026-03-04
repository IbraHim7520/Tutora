export interface IStudentSignupForm {
    name:string 
    email: string,
    Password: string,
    ConfirmPassword: string,
    image: FileList
}



export interface ISignupTutorForm {
    name: string,
    email:string,
    password:string,
    ConfirmPassword?:string,
    image?:string ,
    designation:string,
    degree:string,
    experience:string,
    contact?:string,
    address?:string
}

export interface ISessionUpateFormData {
    title?:string,
    categoryId?:string,
    date?:string,
    fromTime?:string,
    toTime?:string,
}


export interface ICategoryCreateForm {
    title:string,
    description:string
}