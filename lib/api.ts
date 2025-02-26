import { IUser } from "@/database/user.model";
import { fetchHandler } from "./handlers/fetch";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
    users: {
        getAll: () => fetchHandler(`${API_BASE_URL}/users`),
        getById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),
        getByEmail: (email: string) => fetchHandler(`${API_BASE_URL}/users/email` ,{
            method: "POST",
            body: JSON.stringify({email}),
        }),
        create: (userData: Partial<IUser>) => 
            fetchHandler(`${API_BASE_URL}/users`,{
                method:"POST",
                body: JSON.stringify(userData),
            }),
        update: (id: string, userData: Partial<IUser>) => 
            fetchHandler(`${API_BASE_URL}/users/${id}`,{
                method:"PUT",
                body: JSON.stringify(userData),
            }),
        delete: (id: string) => 
            fetchHandler(`${API_BASE_URL}/users/${id}`, { method: "DELETE"}) 
    },

}