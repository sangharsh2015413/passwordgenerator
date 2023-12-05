import { useState,useCallback,useEffect, useRef } from 'react';
import './App.css'

function App() {
  
let[length,setLength]=useState(8);
let[numAllowed,setNumAllowed]=useState(false)
let[charAllowed,setCharAllowed]=useState(false)
let[password,setPassword]=useState("")

//useRef hook
const passwordRef=useRef(null)

const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%^&*()_-+={}[]"

  for (let i =1;  i<=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
  }
  setPassword(pass)
},[length,numAllowed,
  charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
     window.navigator.clipboard.writeText(password)
  },[password])
useEffect(()=>{
  passwordGenerator()
 },[length,numAllowed,charAllowed,passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4  py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg mb-4 overflow-hidden'>
           <input 
           type="text"
           value={password} 
           className='outline-none w-full py-1 px-3' placeholder='Password' 
           readOnly 
           ref={passwordRef}
           />
           <button id='copybtn'
           onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
             />
             <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={()=>{
                setNumAllowed((numAllowed)=!numAllowed)
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={()=>{
                setCharAllowed((charAllowed)=!charAllowed)
              }}
            />
            <label htmlFor='characterInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
