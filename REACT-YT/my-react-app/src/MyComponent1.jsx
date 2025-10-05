import React, {useState} from 'react';

//hook = special function that allows function to use react features without writing the class components
//function whoes name starts with use (ex:useState)

function MyComponent(){
    const [name,setName] = useState("Guest");
    const [age,setAge] = useState(0);
    const [isEmployed,setIsEmployed] = useState(false);

    const changeName = () => {
        setName("BroCode");
    }

    const incrementAge = () => {
        setAge(age+1);
    }

    const toggleIsEmployed = () => {
        setIsEmployed(!isEmployed);
    }

    return(
        <><hr/>
            <div>
                <p>Name:{name}</p>
                <button onClick={changeName}>Change Name</button>
            </div>
            <div>
                <p>Age:{age}</p>
                <button onClick={incrementAge}>Increase Age</button>
            </div>
            <div>
                <p>isEmployed:{isEmployed ? "Yes" : "No"}</p>
                <button onClick={toggleIsEmployed}>Toggle Status</button>
            </div>
        </>
    );
}



export default MyComponent