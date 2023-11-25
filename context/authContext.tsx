'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    address: string;
    phone: string
};




type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(() => {
        const user = window.localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });

    const router = useRouter();
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(
                "https://localhost:7129/User/Login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            if (response.ok) {
                const res = await response.json();
                console.log(res.userView)
                setUser(res.userView);
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem("user", JSON.stringify(res.userView));
                }
                toast.success("Đăng nhập thành công")
                router.refresh()
                router.push('/')
            } else {

                console.log("Login failed. Please check your credentials.");
                toast.error("Đăng nhập thất bại")
            }
        } catch (error) {
            console.log(error);
            toast.error("Đăng nhập thất bại")

        }
    };

    const logout = () => {
        if(typeof window !== 'undefined'){
            window.localStorage.removeItem("user");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};