import React from 'react'

function Navbar() {
  return (
    <nav className='bg-purple-200'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold">
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        <a target='_blank' href="https://github.com/akash6998s"><button className='text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring'>
          <img className='invert w-10 p-1' src="icons/github.png" alt="GitHub" />
          <span className='font-bold px-2'>GitHub</span>
        </button>
        </a>
      </div>
    </nav>
  )
}

export default Navbar