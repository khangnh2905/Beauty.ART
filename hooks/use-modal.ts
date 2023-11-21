
import { create } from "zustand"

type ModalType = "payment" | "signIn" | "signUp"

type CourseCheckout = {
    title: string,
    courseId: string,
    price: number
}

type ModalData = {
    courseCheckout?: CourseCheckout
}

interface ModalStore {
    data?:ModalData,
    type: ModalType | null,
    isOpen: boolean,
    onOpen: (type: ModalType, data: ModalData) => void;
    onClose: () => void
}


export const useModal = create<ModalStore>((set) => ({
    type: null,
    data:{},
    isOpen: false,
    onOpen: (type, data={}) => set({ isOpen: true, type ,data}),
    onClose: () => set({ isOpen: false })
}))