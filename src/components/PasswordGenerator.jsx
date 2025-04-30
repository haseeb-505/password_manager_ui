import React, { useCallback, useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function PasswordGenerator() {
    const [length, setLength] = useState(8);
    const [numbersAllowed, setNumbersAllowed] = useState(false);
    const [charactersAllowed, setCharactersAllowed] = useState(false);
    const [password, setPassword] = useState('')
    const passwordRef = useRef(null);
    // the following state is being used to check if the password has been generated or not
    // bcz I do not want to generate password on every render
    // in fact, I want to do so only when user clicks the generate button 
    // and then want to do it automatically when length, numbersAllowed etc change
    const [hasGenerated, setHasGenerated] = useState(false);

    const generatePassword = useCallback( () => {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz";
        let pass = "";

        if (numbersAllowed) str += "0123456789";
        if (charactersAllowed) str += "`~!@#$%^&*()_+-=[]{}|;,.<>?/'\":";

        for (let i = 0; i <= length; i++) {
            let randIndex = Math.floor(Math.random() * str.length + 1);
            pass +=  str.charAt(randIndex);
        }

        setPassword(pass);
        // setPassword will be called only when the generate button is clicked
        // bcz generatePassword is linked to the button click event
        // so we can now set the hasGenerated to true
        setHasGenerated(true);
    }, [length, numbersAllowed, charactersAllowed, setPassword])

    useEffect(() => {
        // conditional check if the password has already been generated or not
        // if it has been , then we let the useEffect hook execute the generatePassword function
        if (hasGenerated) {
            generatePassword();
            // now this function will be called only when the length, numbersAllowed or charactersAllowed changes
            // provided that the password has already been generated
        }
    }, [length, numbersAllowed, charactersAllowed]);

    const copyPasswordToClipboard = useCallback( () => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(passwordRef.current.value);
        toast.success('Password copied successfully!!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
    }, [password]);
    

  return (
    <div className='text-white bg-gray-700 text-center p-4 rounded-lg shadow-md my-4'>
      <h1 className='text-xl font-bold'>Password Generator</h1>
      <div className=' flex justify-between rounded-lg my-2 gap-2 pl-2 text-black'>
        <input 
            type="text" 
            value={password} 
            readOnly
            className='outline-none w-full px-2 bg-white rounded-lg cursor-pointer' 
            placeholder='Generate Password'
            ref={passwordRef}
        />
        <button 
            className='outline-none px-3py-0.5shrink-0 bg-blue-600 rounded-lg text-white font-medium p-2 cursor-pointer'
            onClick={generatePassword}
        >
            Generate
        </button>
        <button 
            className='outline-none px-3py-0.5shrink-0 bg-blue-600 rounded-lg text-white font-medium p-2 cursor-pointer'
            onClick={copyPasswordToClipboard}
            
        >
            Copy
        </button>
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
                    theme="dark"
                  />
    </div>
  )
}

export default PasswordGenerator
