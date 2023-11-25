"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";

const PaymentModal = () => {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "payment";
if(!data) return null;
  const handleCheckOut = async () => {
    //TO DO TO CHECKOUT
    const courseId = data.courseCheckout?.courseId;
    const id = data.courseCheckout?.id;
    const totalPrice = data.courseCheckout?.totalPrice
    const userId = data.courseCheckout?.userId

    const value = {courseId, id, totalPrice, userId}
    //price title courseId
    await axios.post(`https://localhost:7129/api/Order`, value)
    // await axios.post("url" , value)
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận thanh toán</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="text-center text-lg text-neutral-700 font-bold uppercase">
            Information
          </div>

          <span> Tên khóa học : {data?.courseCheckout?.title}</span>
          <span> Giá :{data?.courseCheckout?.totalPrice}</span>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleCheckOut}>
            Thanh toán
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
