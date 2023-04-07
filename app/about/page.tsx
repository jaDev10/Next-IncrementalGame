import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center bg-backgroundMain'>
        <h1 className='m-2 mt-8 text-4xl font-bold'>About</h1>
        <div className='border p-3'>
        <p className='mb-2'>Incremental game developed to learn the capabilities of NextJS & React</p>
        <p>Buy autoclickers to increase gold per second</p>
        <p>Buy items to improve autoclicker output</p>
        <p className='mb-2'>Defeat bosses to get a multiplier</p>
        <p>Game uses localStorage to save data</p>
        </div>
        
    </div>
  )
}

export default page