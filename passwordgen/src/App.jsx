import { useState , useCallback, useEffect , useRef} from 'react'


import { set } from 'mongoose'

function App() {
const [length , setlength]= useState(8)
const [numallowed , setnumallowed]= useState(false)
const [charallowed , setcharallowed]= useState(false)
const [pass , setpass]= useState("")


// ref  hook 
const passRef=  useRef(null)

const passgen = useCallback(()=>{
let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if  (numallowed) str += "0123456789"
if  (charallowed) str  += "!@#$%^&*()_{}:><?+"

for  (let i =1 ;  i<= length ; i++){
  let char = Math.floor(Math.random()*str.length+1)
  pass += str.charAt(char)

}

setpass(pass)


} 
,[length , numallowed , charallowed  , setpass])

const copypasstoclipboard =  useCallback(()=>{
  passRef.current?.select();
  passRef.current?.setSelectionRange(0,99999)
  window.navigator.clipboard.writeText(pass)
} , [pass])

useEffect(()=>{passgen()},[length , numallowed , charallowed  , setpass])
  return (
    <>
       <div className='w-full max-w-md mx-auto  
       shadow-md rounded-lg px-4  py-3 my-8  text-orange-500 bg-gray-700'>
       <h1 className='text-white text-center my-3' > Random Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text" 
           value ={pass}
           className=' oueline-none  w-full py-1 px-3 '
           placeholder='Password'
           readOnly
           ref={passRef}
           />
           <button 
           onClick={copypasstoclipboard}
           className='bg-blue-700 text-white 
           px-3 py-0.5 shrink-0'
           >copy</button>
         </div>
          <div className='flex text-sm gap-x-2' >
              <div className='flex items-center gap-x-1' >
                <input
                 type="range" 
                 min={6}
                 max ={20}
                 value={length}
                className='cursor-pointer'
                onChange={(e)=>setlength(e.target.value)}
                  />
                  <label > length:{length} </label>
              </div>
              <div className=' flex items-center gap-x-1' >
                <input 
                type="checkbox"
                defaultChecked={numallowed}
                id ="numberInput"
                onChange={()=>{
               setnumallowed((prev)=> !prev)
          }}
                 />
                 <label htmlFor="numberInput">Numbers</label>
              </div>

              <div className=' flex items-center gap-x-1' >
                <input 
                type="checkbox"
                defaultChecked={charallowed}
                id ="charInput"
                onChange={()=>{
               setcharallowed((prev)=> !prev)
          }}
                 />
                 <label htmlFor="charInput">Characters</label>
              </div>
          </div>
       </div>
    </>
  )
}

export default App
