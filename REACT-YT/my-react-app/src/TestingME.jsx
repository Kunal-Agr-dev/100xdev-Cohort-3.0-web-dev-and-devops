import React,{useState} from "react";


function TestingMe(){
    const [count,setCount] = useState(0);

    const handleCounter = () =>{
        setCount(c => c+1);
    }
    return(
        <div>
            <h1>{count}</h1>
            <button onClick={handleCounter} >counter</button>
        </div>
    );
}

export default TestingMe;