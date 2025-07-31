import React from 'react'

const Navbar = () => {
  return (

    <nav className='bg-[rgb(40,53,109)]  text-white'>
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-12'>
        <div className="logo font-bold text-2xl">
          <span className='text-[rgb(40,219,175)]'>&lt;</span>
          Pass
          <span className='text-[rgb(40,219,175)]'>OP/&gt;</span>
          
          </div>
        
        <button className='text-white bg-[rgb(40,219,175)] my-5 rounded-full flex justify-around items-center'>
          <img className='w-10 invert p-1' src="icon/github.svg" alt="github logo" />
          <span className='font-bold px-2'>GitHub</span>
          
        </button>
      </div>
    </nav>

  )
}

export default Navbar
