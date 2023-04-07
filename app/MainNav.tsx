import React from 'react'
import Link from 'next/link'

export default function MainNav() {
  return (
    <nav className='flex bg-backgroundMain'>
    <Link href = '/' className='m-2 px-4 py-1 bg-grayish'>Game</Link>
    <Link href = '/about' className='m-2 px-4 py-1 bg-grayish'>About</Link>
  </nav>  )
}
