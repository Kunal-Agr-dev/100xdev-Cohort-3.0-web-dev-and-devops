

function Button(){
    let count = 0;

    const handleClick = (name) => {
        if(count < 4){
            count++;
            console.log(`${name}, you clicked me ${count} time/s`);
        }
        else{
            console.log(`${name}, STOP clicking me dude`);
        }
    }
    

    return(
        <button onClick={() => handleClick("Kunal")}> {/* we are using here arrow function so that the function isnt called before we click the button*/}
            Click me &nbsp;😁
        </button>
    );
}

export default Button