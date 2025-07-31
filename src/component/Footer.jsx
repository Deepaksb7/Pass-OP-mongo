import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[rgb(40,53,109)] text-white flex flex-col justify-center items-center w-full'>
        <div className='text-4xl font-bold text-center' >
          <span className='text-[rgb(40,219,175)]'>&lt;</span>
          <span>Pass</span>
          <span className='text-[rgb(40,219,175)]'>OP/&gt;</span>
      </div>
      <div className='flex justify-center items-center'>Created with <img className='w-7 mx-2' src="icon/heart.png" alt="" /> by Deepak</div>
    </div>
  )
}

export default Footer
