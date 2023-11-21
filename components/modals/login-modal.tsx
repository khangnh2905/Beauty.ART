"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { toast } from "react-toastify";

// nextauth
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useAuth } from "@/context/authContext";
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});
const LogInModal = () => {
  const { login } = useAuth();

  const { isOpen, onOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "signIn";

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      login(values.email, values.password);
      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      //   toast.error("Có lỗi xảy ra rồi");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader className="text-2xl font-bold text-center">
          <DialogTitle className="text-center">Đăng nhập</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-100/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Nhập Email..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-100/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="nhập mật khẩu..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="default"
              className="w-full "
            >
              Đăng nhập
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <div className="text-sm flex-1">
            Not a member ?{" "}
            <span
              className="text-purple-400 hover:underline hover:text-purple-300  cursor-pointer"
              onClick={() => onOpen("signUp", {})}
            >
              Sign up now
            </span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogInModal;
