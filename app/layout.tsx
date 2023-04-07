import Link from 'next/link'
import './globals.css'
import MainNav from './MainNav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className='h-screen bg-backgroundMain'>
        <MainNav />
        {children}
        </div>
        </body>
    </html>
  )
}
