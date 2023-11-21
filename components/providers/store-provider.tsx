'use client'

import React, { useEffect, useState } from 'react'
import PaymentModal from '../modals/payment-modal'

const StoreProvider = () => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    })

    if (!mounted) {
        return null
    }

    return (
        <>
            <PaymentModal />
        </>
    )
}

export default StoreProvider