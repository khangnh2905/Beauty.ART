"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { useAuth } from "@/context/authContext";
import { useModal } from "@/hooks/use-modal";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const NavbarRoutes = () => {
  // const { userId } = useAuth();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { onOpen } = useModal();
  const isTeacherPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  console.log(user?.id)

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(user?.id) ? (
          <Link href="/admin/courses">
            <Button size="sm" variant="ghost">
              Admin mode
            </Button>
          </Link>
        ) : null}
        {/* <UserButton
          afterSignOutUrl="/"
        /> */}
        <div className="space-x-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={user.image ? user.image : "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="secondary" onClick={() => onOpen("signIn", {})}>
                Login
              </Button>
              <Button variant="success" onClick={() => onOpen("signUp", {})}>
                SignUp
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
