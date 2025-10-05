import React,{useState} from 'react'

function Counter(){
    const [count,setCount] = useState(0);

    const increment = () => {
        //setCount(count+1); this is not recommended as ...
        // Uses the CURRENT state to calculate the NEXT state.
        // set functions do not trigger an update.
        // React batches together state updates for performance reasons.
        // NEXT state becomes the CURRENT state after an update.
        setCount(c => c+1) //u can use the first letter of the vairable or use prev as preffix
    }

    const decrement = () => {
        setCount(c => c-1);
    }

    const reset = () => {
        setCount(0); //here there is no need of updater function here
    }

    return(
        <div className="counter">
            <h1 > {count} </h1>
            <span>
                <button onClick={increment}> increment </button>
                <button onClick={decrement}> decrement </button>
                <button onClick={reset}> reset </button>
            </span>
        </div>
    );
}

export default Counter

// updater function = A function passed as an argument to setState() usually
//                    ex. setYear (arrow funciton)
//                    Allow for safe updates based on the previous state
//                    Used with multiple state updates and asynchronous functions
//                    Good practice to use updater functions