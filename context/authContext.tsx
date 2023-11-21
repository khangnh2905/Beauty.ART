'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

export type User = {
    userId: string;
    username: string;
    email: string;
    image: string;
    // fullName: string;
    // role: "STAFF" | "ADMIN" | "MANAGER";
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
    const [user, setUser] = useState(() => {
        const user = window.localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });
    const router = useRouter();
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(
                "http://localhost:3001/user",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            if (response.ok) {
                const user = await response.json();
                console.log(user)
                setUser(user);
                window.localStorage.setItem("user", JSON.stringify(user));
                // toast.success("Đăng nhập thành công")
                router.push('/')
            } else {

                console.log("Login failed. Please check your credentials.");
                // toast.error("Đăng nhập thất bại")
            }
        } catch (error) {
            console.log(error);
            // toast.error("Đăng nhập thất bại")

        }
    };

    const logout = () => {
        window.localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};