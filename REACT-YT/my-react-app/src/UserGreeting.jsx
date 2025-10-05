//conditional rendering = allows u to control what gets rendered in your application based on certain conditions like show,hide etc

function UserGreeting(props){
    const welcomeMsg = <h2>Welcome {props.username}</h2>
    const loginMsg = <h2>Please login to continue</h2>

    return(props.isLoggedIn ? welcomeMsg : loginMsg); //also can use if else instead of ternary 
}

export default UserGreeting