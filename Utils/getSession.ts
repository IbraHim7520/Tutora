import authClient from "@/lib/auth-client";

const getSession = async()=>{
    const ses = await authClient.getSession();
    console.log(ses);
    return ses.data;
}

export default getSession;