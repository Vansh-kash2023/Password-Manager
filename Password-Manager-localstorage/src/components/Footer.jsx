import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col bg-slate-800 text-white items-center fixed bottom-0 w-full h-14'>
        <div className="logo font-bold text-2xl">
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
        </div>
        <div className='flex items-center gap-2'>
            Created with <img src="/icons/heart.png" alt="Love" className='h-4'/> by Vansh :)
        </div>
        </div>
    )
}

export default Footer
