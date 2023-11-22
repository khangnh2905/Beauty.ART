"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useModal } from "@/hooks/use-modal";

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

  const {onOpen} = useModal();
  const data = {price, courseId, title}  

  const onClick = () => {
    // try {
    //   setIsLoading(true);

    //   const response = await axios.post(`/api/courses/${courseId}/checkout`)

    //   console.log(response)
    //   window.location.assign(response.data.url);
    // } catch {
    //   toast.error("Something went wrong");
    // } finally {
    //   setIsLoading(false);
    // }
  }
  
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