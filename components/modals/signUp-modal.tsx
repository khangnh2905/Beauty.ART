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
  FormDescription,
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

import axios from "axios";
import { useModal } from "@/hooks/use-modal";
// nextauth
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";

export const SignUpSchema = z.object({
  name: z.string().min(2),
  password: z.string().min(2),
  email: z.string().email(),
});

const SignUpModal = () => {
  const { isOpen, onOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "signUp";

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {

    const id = uuidv4()

    const phone = "";
    const address = ""
    const name = values.name;
    const email = values.email;
    const password = values.password
    const valueForm = { address, phone, name, email, password,id }

    try {
      await axios.post("https://localhost:7129/User/Register", valueForm);
        toast.success("Đăng kí thành công");
      form.reset();
      onOpen("signIn", {});
    } catch (error) {
      console.log(error);
        toast.error("Đăng kí thất bại");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader className="text-2xl font-bold text-center">
          <DialogTitle className="text-center">Đăng Kí</DialogTitle>
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
                      placeholder="Nhập tên email..."
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Tên đăng nhập
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-100/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Nhập tên đăng nhập..."
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
              variant="secondary"
              className="w-full "
            >
              Đăng kí
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <div className="text-sm flex-1">
            if you have an account ?{" "}
            <span
              className="text-purple-400 hover:underline hover:text-purple-300  cursor-pointer"
              onClick={() => onOpen("signIn", {})}
            >
              login now
            </span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;