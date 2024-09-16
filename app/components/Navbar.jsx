import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around items-center bg-gray-100 shadow-md container'>
      <h1>Logo</h1>

      <div className='space-x-3'>
        <Link href='/'>Home</Link>
        <Link href='/product'>Product</Link>
        <Link href= '/category'>Category</Link>
        <Link href='./about'>About</Link>
        <Link href='./contact'>Contact</Link>
      </div>

      <div>
      <Link className='bg-green-500 p-4 rounded-sm' href='./api/auth/signin'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar
