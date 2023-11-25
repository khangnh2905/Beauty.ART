'use client'

import React, { useEffect, useState } from 'react'
import PaymentModal from '../modals/payment-modal'
import LogInModal from '../modals/login-modal'
import SignUpModal from '../modals/signUp-modal'

const StoreProvider = () => {

    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
        console.log("Component is mount")
    },[])

    if (!mounted) {
        return null
    }

    return (
        <>
            <PaymentModal />
            <LogInModal/>
            <SignUpModal/>
        </>
    )
}

export default StoreProvider