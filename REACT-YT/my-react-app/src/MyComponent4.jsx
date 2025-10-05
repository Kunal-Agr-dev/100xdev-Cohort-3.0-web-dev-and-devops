import React,{useState} from 'react'

function MyComponent4(){
    const [foods,setFoods] = useState(["Apple","Orange","Mango"]);

    function handleAddChange(){
        const newFood = document.getElementById("food-input").value;
        document.getElementById("food-input").value = "";
        setFoods(f => [...f, newFood]);
    }

    function handleRemoveChange(index){
        setFoods(foods.filter((_,i) => i != index));  //_ to ignore the argument and using i as we are already using index as argument
    }

    return(
        <div>
            <h2>List of Foods</h2>
            <ul>
                {foods.map((food,index) => <li key={index} onClick={() => handleRemoveChange(index)} >{food}</li>)}
            </ul>
            <input type="text" id="food-input" placeholder='Enter food'/>
            <button onClick={handleAddChange}>Add Food</button>
        </div>
    );
}
//use arrow fn when u need to pass arguments
export default MyComponent4