import React, { useEffect } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import { useRef, useState } from 'react';
import { MdCopyAll } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {v4 as uuidv4} from "uuid";

const Manager = () => {
  const ref = useRef()
  const passwordref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getpasswords = async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
      setpasswordArray((passwords))
  }

  useEffect(() => {
    getpasswords()
    
  }, [])

  const copyText = (text) => {
    toast('Copy to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
    });
    navigator.clipboard.writeText(text)
  }


  const showpassword = () => {

    if (ref.current.src.includes("/icon/eyecross.png")) {
      ref.current.src = "/icon/eye.png"
      passwordref.current.type = "password"
    }
    else {
      ref.current.src = "/icon/eyecross.png"
      passwordref.current.type = "text"
    }
  }

  const savepassword = async () => {
    if (form.site.length >3 && form.username.length >3 && form.password.length >3){

    await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id })})

    setpasswordArray([...passwordArray,{...form,id:uuidv4()}])

    await fetch("http://localhost:3000/",{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form,id:uuidv4()}]))
    // console.log([...passwordArray, form])
    setform({ site: "", username: "", password: "" })
    toast('Password saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    }
    else{
      toast('Password not saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    }
  }

  const deletepassword = async (id) => {
    let c = confirm("do you want to delete this?")
    if (c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      let res = await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id })})
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast('Password Delete!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
    });
    }
      
    
  }

  const editpassword = (id) => {
    setform({...passwordArray.filter(i=>id===i.id)[0], id:id})
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className='p-2 md:px-40 md:container md:min-h-[87.4vh] min-h-[86.3vh] mx-auto'>

        <h1 className='text-4xl font-bold text-center mt-18' >
          <span className='text-[rgb(40,219,175)]'>&lt;</span>
          <span>Pass</span>
          <span className='text-[rgb(40,219,175)]'>OP/&gt;</span>
        </h1>
        <h2 className='text-center text-2xl font-bold '>Our own password Manager</h2>
        <div className='text-black flex flex-col p-4 gap-8 items-center '>
          <input value={form.site} onChange={handlechange} name='site' placeholder='Enter website URL' className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="text" />
          <div className='flex flex-col md:flex-row justify-between w-full gap-8'>
            <input value={form.username} onChange={handlechange} name='username' placeholder='Enter Username' className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="text" />
            <div className="relative">
              <input ref={passwordref} value={form.password} onChange={handlechange} name='password' placeholder='Enter Password' className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="password" />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword}>
                <img ref={ref} className='p-1 w-[26px]' src="/icon/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savepassword} className='flex justify-center items-center bg-[rgb(40,219,175)] px-4 gap-2 py-2 rounded-full w-fit hover:bg-green-300 border border-green-900'><IoMdAddCircle />Add Password</button>
        </div>
        <div className="password">
          <h2 className='font-bold text-xl py-4'>
            Your Password
          </h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-[rgb(40,219,175)] text-white '>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className=' py-2 w-42 text-center'>
                      <div className='flex justify-center items-center'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div className='cursor-pointer' onClick={() => copyText(item.site)}>< MdCopyAll /></div>
                      </div>
                    </td>
                    <td className='py-2 w-42 text-center'>
                      <div className='flex justify-center items-center'>
                        {item.username}
                        <div className='cursor-pointer' onClick={() => copyText(item.username)}>< MdCopyAll /></div>
                      </div>
                    </td>

                    <td className='py-2 w-42 text-center'>
                      <div className='flex justify-center items-center'>
                        {"*".repeat(item.password.length)}
                        <div className='cursor-pointer' onClick={() => copyText(item.password)}>< MdCopyAll /></div>
                      </div>
                    </td>

                    <td className='py-2 w-42 text-center'>
                      <div className='flex justify-center items-center'>

                      <span className='m-2' onClick={()=>{editpassword(item.id)}}><FaEdit /></span>
                      <span className='m-1' onClick={()=>{deletepassword(item.id)}}><MdDeleteForever /></span>
                      </div>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>}
        </div>
      </div>
    </>

  )
}

export default Manager

