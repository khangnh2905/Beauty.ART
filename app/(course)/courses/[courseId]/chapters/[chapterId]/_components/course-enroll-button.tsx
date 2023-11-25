"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {v4 as uuidV4} from "uuid"
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useModal } from "@/hooks/use-modal";
import { useAuth } from "@/context/authContext";

interface CourseEnrollButtonProps {
  title: string;
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  price,
  courseId,
  title
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {user} = useAuth();
  const {onOpen} = useModal();
  if(!user) {
    return null;
  }
  const id =uuidV4();
  const data = {id, totalPrice: price, courseId, title, userId: user.id}  

  // const onClick = async() => {
  //   try {
  //     setIsLoading(true);

  //     const response = await axios.post(`https://localhost:7129/api/Order`, data)

  //     console.log(response)
  //     window.location.assign(response.data.url);
  //   } catch {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  
  return (
    <Button
      onClick={() => onOpen("payment", {courseCheckout: data})}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}