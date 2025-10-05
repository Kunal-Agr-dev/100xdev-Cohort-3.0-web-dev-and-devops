import React,{useState} from 'react'

function MyComponent3(){
    const [car,setCar] = useState({year:2024,make:"Ford",model:"Mustang"});

    function handleYearChange(event) {
        setCar(c => ({...c, year:event.target.value})); //use () as if u write more than one thing in {} then JS thinks you are writing multiline
    }
    function handleMakeChange(event) {
        setCar(c => ({...c, make:event.target.value}));
    }
    function handleModelChange(event) {
        setCar(c => ({...c, model:event.target.value}));
    }

    return(
        <div>
           <h3>My Favourite Car: {car.year} {car.make} {car.model}</h3> 
           <input type="number" value={car.year} onChange={handleYearChange}/>
           <input type="text" value={car.make} onChange={handleMakeChange}/>
           <input type="text" value={car.model} onChange={handleModelChange}/>
        </div>
    );
}

export default MyComponent3