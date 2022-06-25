import React, {useState} from 'react'

function TestApp() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
        {isOpen.toString()}
        <div>test</div>
        <button onClick={()=>{setIsOpen(!isOpen)}}></button>
        </div>
    )
}

export default TestApp;