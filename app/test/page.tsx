import { auth } from '@clerk/nextjs';
import React from 'react'

const Test = () => {
    const {userId} = auth(); 
    console.log(userId)
  return (
    <div>Test</div>
  )
}

export default Test