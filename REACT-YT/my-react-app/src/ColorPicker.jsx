import React,{useState} from 'react'

function ColorPicker(){
    const [color,setColor] = useState("#000000ff");
    
    function handleColorChange(event){
        setColor(event.target.value);
    }
    return(
        <div className="color-main-container">
            <h1 >Color Picker</h1>
            <div className="color-container" style={{backgroundColor:color}}>
                Selected Color:{color}
            </div>
            <div>
                <label>Select a Color:</label>
                <input type="color" onChange={handleColorChange}/>
            </div>
        </div>
    );

}

export default ColorPicker