    'use client'

    import React from 'react'
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
    import { Button } from '../ui/button'
    import { Label } from '../ui/label'
    import { Input } from '../ui/input'
    import { useModal } from '@/hooks/use-modal'

    const PaymentModal = () => {

        const { isOpen, type, onClose } = useModal();

        const isModalOpen = isOpen && type === "payment"

        const handleCheckOut = () => {
            //TO DO TO CHECKOUT
            console.log("click to checkout")
        }

        return (
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Xác nhận thanh toán</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4 ">
                        <div className='text-center text-lg text-neutral-700 font-bold uppercase'>Information</div>
                       
                        <span> Tên khóa học :</span> 
                        <span> Giá :</span> 
                    </div>
                    
                    <DialogFooter>
                        <Button type="submit" onClick={handleCheckOut}>Thanh toán</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    export default PaymentModal