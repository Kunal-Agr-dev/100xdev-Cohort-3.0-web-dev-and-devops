import React,{useState} from 'react';
//onChange = event handler that are mainly used for form element
//          ex: <input> , <textArea>, <select>, etc
//          triggers a function every time the value of input changes

function MyComponent2(){
    const [name,setName] = useState("Guest");
    const [quantity,setQuantity] = useState(1);
    const [comment,setComment] = useState("");
    const [payment,setPayment] = useState("");
    const [shipping,setShipping] = useState("Please select your shipping option");

    function handleNameChange (event){
        setName(event.target.value);
    }
    function handleQuantityChange (event){
        setQuantity(event.target.value);
    }
    function handleCommentChange (event){
        setComment(event.target.value);
    }
    function handlePaymentChange (event){
        setPayment(event.target.value);
    }
    function handleShippingChange (event){
        setShipping(event.target.value);
    }

    return(
        <div>
            <input value={name} onChange={handleNameChange}/>
            <p>Name : {name} </p>

            <input value={quantity} onChange={handleQuantityChange} type="number"/>
            <p>Quantity : {quantity} </p>

            <textarea value={comment} onChange={handleCommentChange}/>
            <p>Comment : {comment} </p>

            <select value={payment} onChange={handlePaymentChange} >
                <option value="">Select an Option</option>
                <option value="COD">COD</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI</option>
            </select> 
            <p> Payment: {payment}</p>
            <p> shipping: {shipping}</p>
            <label>
                <input onChange={handleShippingChange} type="radio" value="Pick up" checked={shipping == "Pick up"}/>
                Pick up
            </label><br/>
            <label>
                <input onChange={handleShippingChange} type="radio" value="Delivery" checked={shipping == "Delivery"}/>
                Delivery
            </label><br/>
        </div>
    );
}

export default MyComponent2