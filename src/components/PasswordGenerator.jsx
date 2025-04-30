import React, { useCallback, useState } from 'react'

function PasswordGenerator() {
    const [length, setLength] = useState(8);
    const [numbersAllowed, setNumbersAllowed] = useState(false);
    const [charactersAllowed, setCharactersAllowed] = useState(false);
    const [password, setPassword] = useState('')

    const generatePassword = useCallback( () => {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz";
        let pass = "";

        if (numbersAllowed) str += "0123456789";
        if (charactersAllowed) str += "`~!@#$%^&*()_+-=[]{}|;,.<>?/'\":";

        for (let i = 0; i <= length; i++) {
            let randIndex = Math.floor(Math.random() * str.length + 1);
            pass +=  str.charAt(randIndex);
        }

        setPassword(pass)
    }, [length, numbersAllowed, charactersAllowed, setPassword])

  return (
    <div className='text-white bg-gray-500 text-center p-4 rounded-lg shadow-md my-4'>
      <h1 className='text-xl font-bold'>Password Generator</h1>
      <div className=' flex justify-between rounded-lg my-2 gap-2 pl-2 text-black'>
        <input 
            type="text" 
            value={password} 
            readOnly
            className='outline-none w-full px-2 bg-white rounded-lg' 
            placeholder='Generate Password'
        />
        <button className='outline-none px-3py-0.5shrink-0 bg-blue-600 rounded-lg text-white font-medium p-2'>Generate</button>
        <button className='outline-none px-3py-0.5shrink-0 bg-blue-600 rounded-lg text-white font-medium p-2'>Copy</button>
      </div>
        
        <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
                <input type="range" name="length" id="length" min={8} max={100} onChange={(e) =>{setLength(e.target.value)}}/>
                <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-2'>
                <input type="checkbox" name="numbersAllowed" defaultChecked={numbersAllowed} onChange={() => { setNumbersAllowed((prev) => !prev)}} />
                <label>Numbers</label>
            </div>
            <div className='flex items-center gap-2'>
                <input type="checkbox" name="charactersAllowed" defaultChecked={charactersAllowed} onChange={() => { setCharactersAllowed((prev) => !prev)}} />
                <label>Characters</label>
            </div>
        </div>
    </div>
  )
}

export default PasswordGenerator
